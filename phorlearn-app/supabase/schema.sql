-- ============================================================
--  PhorLearn SHS — MySQL 8.0 schema
--  Run this in MySQL Workbench (open a SQL tab, paste, execute).
--  It creates the database, all tables, and the global seed rows.
--  Per-user demo data is seeded by the app on signup (see lib/seed.ts).
--
--  CLOUD / MANAGED MySQL (TiDB Cloud, Aiven, Clever Cloud, etc.):
--  Those providers give you a ready-made database and usually do NOT allow
--  CREATE DATABASE. In that case, DELETE the three lines in the
--  "Database" block below and just run the rest inside the database they gave
--  you (set MYSQL_DATABASE in your env to that database's name).
-- ============================================================

-- ------------------------------------------------------------
-- Database (skip this block on managed providers — see note above)
-- ------------------------------------------------------------
create database if not exists phorlearn
  character set utf8mb4 collate utf8mb4_unicode_ci;
use phorlearn;

-- ------------------------------------------------------------
-- Drop existing tables. Disabling FK checks makes the drop order
-- irrelevant and lets the whole script be re-run safely any time.
-- ------------------------------------------------------------
set foreign_key_checks = 0;

drop table if exists ward_subjects;
drop table if exists wards;
drop table if exists teacher_lessons;
drop table if exists assignments;
drop table if exists class_students;
drop table if exists classes;
drop table if exists achievements;
drop table if exists chat_messages;
drop table if exists quiz_attempts;
drop table if exists homework;
drop table if exists weekly_stats;
drop table if exists subject_progress;
drop table if exists top_subjects;
drop table if exists platform_stats;
drop table if exists exam_config;
drop table if exists profiles;
drop table if exists users;

set foreign_key_checks = 1;

-- Every table is InnoDB + utf8mb4 so foreign keys work and char(36)
-- columns join cleanly regardless of the server's default engine/charset.

-- 1. Auth: users + profiles ----------------------------------
--    Supabase's auth.users is replaced by this local users table.
create table users (
  id            char(36)     not null default (uuid()),
  email         varchar(255) not null,
  password_hash varchar(255) not null,
  created_at    timestamp    not null default current_timestamp,
  primary key (id),
  unique key uq_users_email (email)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table profiles (
  id         char(36)     not null,
  full_name  varchar(255),
  role       enum('student','teacher','parent','admin') not null default 'student',
  shs_class  enum('SHS1','SHS2','SHS3') null,
  programme  varchar(120),
  avatar_url varchar(255),
  created_at timestamp    not null default current_timestamp,
  updated_at timestamp    not null default current_timestamp on update current_timestamp,
  primary key (id),
  constraint fk_profiles_user foreign key (id) references users (id) on delete cascade
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

-- 2. Student dashboard data ----------------------------------
create table subject_progress (
  id         char(36) not null default (uuid()),
  user_id    char(36) not null,
  subject    varchar(120) not null,
  progress   int not null default 0,
  color      varchar(20) not null default '#1B4FD8',
  sort_order int not null default 0,
  updated_at timestamp not null default current_timestamp on update current_timestamp,
  primary key (id),
  unique key uq_progress_user_subject (user_id, subject),
  constraint fk_progress_user foreign key (user_id) references users (id) on delete cascade,
  constraint ck_progress_range check (progress between 0 and 100)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table weekly_stats (
  user_id       char(36) not null,
  lessons_done  int not null default 0,
  study_minutes int not null default 0,
  quiz_average  int not null default 0,
  streak_days   int not null default 0,
  updated_at    timestamp not null default current_timestamp on update current_timestamp,
  primary key (user_id),
  constraint fk_weekly_user foreign key (user_id) references users (id) on delete cascade
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table homework (
  id         char(36) not null default (uuid()),
  user_id    char(36) not null,
  title      varchar(255) not null,
  subject    varchar(120),
  due_at     datetime not null,
  status     varchar(20) not null default 'pending',
  created_at timestamp not null default current_timestamp,
  primary key (id),
  key idx_homework_user (user_id),
  constraint fk_homework_user foreign key (user_id) references users (id) on delete cascade
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table exam_config (
  id        int not null,
  exam_name varchar(60) not null default 'WASSCE',
  exam_date date not null,
  primary key (id)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

insert into exam_config (id, exam_name, exam_date)
values (1, 'WASSCE', date_add(curdate(), interval 87 day));

create table quiz_attempts (
  id               char(36) not null default (uuid()),
  user_id          char(36) not null,
  subject_slug     varchar(80) not null,
  subject_name     varchar(120) not null,
  `year`           int not null,
  score            int not null,
  total            int not null,
  percentage       int not null,
  duration_seconds int,
  created_at       timestamp not null default current_timestamp,
  primary key (id),
  key idx_attempts_user_paper (user_id, subject_slug, `year`, created_at),
  constraint fk_attempts_user foreign key (user_id) references users (id) on delete cascade
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table chat_messages (
  id         char(36) not null default (uuid()),
  user_id    char(36) not null,
  subject    varchar(120) not null,
  topic      varchar(255) not null,
  role       enum('user','ai') not null,
  `text`     text not null,
  created_at timestamp not null default current_timestamp,
  primary key (id),
  key idx_chat_user_topic (user_id, subject, topic, created_at),
  constraint fk_chat_user foreign key (user_id) references users (id) on delete cascade
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table achievements (
  id          char(36) not null default (uuid()),
  user_id     char(36) not null,
  name        varchar(120) not null,
  description varchar(255),
  icon        varchar(16),
  unlocked    boolean not null default false,
  sort_order  int not null default 0,
  primary key (id),
  unique key uq_ach_user_name (user_id, name),
  constraint fk_ach_user foreign key (user_id) references users (id) on delete cascade
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

-- 3. Teacher: classes, roster, assignments, materials --------
create table classes (
  id         char(36) not null default (uuid()),
  teacher_id char(36) not null,
  name       varchar(160) not null,
  subject    varchar(120),
  created_at timestamp not null default current_timestamp,
  primary key (id),
  key idx_classes_teacher (teacher_id),
  constraint fk_classes_teacher foreign key (teacher_id) references users (id) on delete cascade
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table class_students (
  id         char(36) not null default (uuid()),
  class_id   char(36) not null,
  full_name  varchar(160) not null,
  score      int not null default 0,
  created_at timestamp not null default current_timestamp,
  primary key (id),
  key idx_cs_class (class_id),
  constraint fk_cs_class foreign key (class_id) references classes (id) on delete cascade,
  constraint ck_cs_score check (score between 0 and 100)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table assignments (
  id         char(36) not null default (uuid()),
  class_id   char(36) not null,
  title      varchar(255) not null,
  subject    varchar(120),
  due_at     datetime not null,
  created_at timestamp not null default current_timestamp,
  primary key (id),
  key idx_assign_class (class_id),
  constraint fk_assign_class foreign key (class_id) references classes (id) on delete cascade
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table teacher_lessons (
  id         char(36) not null default (uuid()),
  class_id   char(36) not null,
  title      varchar(255) not null,
  subject    varchar(120),
  content    text,
  created_at timestamp not null default current_timestamp,
  primary key (id),
  key idx_tl_class (class_id),
  constraint fk_tl_class foreign key (class_id) references classes (id) on delete cascade
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

-- 4. Parent: wards -------------------------------------------
create table wards (
  id            char(36) not null default (uuid()),
  parent_id     char(36) not null,
  full_name     varchar(160) not null,
  shs_class     enum('SHS1','SHS2','SHS3') null,
  programme     varchar(120),
  study_minutes int not null default 0,
  lessons_done  int not null default 0,
  streak_days   int not null default 0,
  created_at    timestamp not null default current_timestamp,
  primary key (id),
  key idx_wards_parent (parent_id),
  constraint fk_wards_parent foreign key (parent_id) references users (id) on delete cascade
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table ward_subjects (
  id         char(36) not null default (uuid()),
  ward_id    char(36) not null,
  subject    varchar(120) not null,
  score      int not null default 0,
  color      varchar(20) not null default '#1B4FD8',
  sort_order int not null default 0,
  primary key (id),
  key idx_ws_ward (ward_id),
  constraint fk_ws_ward foreign key (ward_id) references wards (id) on delete cascade,
  constraint ck_ws_score check (score between 0 and 100)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

-- 5. Admin: platform statistics ------------------------------
create table platform_stats (
  id                int not null,
  total_users       int not null default 0,
  active_today      int not null default 0,
  lessons           int not null default 0,
  resources         int not null default 0,
  shs1_pct          int not null default 0,
  shs2_pct          int not null default 0,
  shs3_pct          int not null default 0,
  growth_this_month int not null default 0,
  growth_last_month int not null default 0,
  retention_pct     int not null default 0,
  primary key (id)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

insert into platform_stats
  (id, total_users, active_today, lessons, resources,
   shs1_pct, shs2_pct, shs3_pct, growth_this_month, growth_last_month, retention_pct)
values (1, 12458, 3215, 432, 8921, 20, 35, 45, 1240, 980, 74);

create table top_subjects (
  id         char(36) not null default (uuid()),
  name       varchar(120) not null,
  sessions   int not null default 0,
  sort_order int not null default 0,
  primary key (id),
  unique key uq_top_name (name)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci;

insert into top_subjects (name, sessions, sort_order) values
  ('Elective Maths', 2841, 1),
  ('Biology',        2204, 2),
  ('English',        1988, 3),
  ('Chemistry',      1701, 4),
  ('Physics',        1455, 5);
