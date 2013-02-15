/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : PostgreSQL
 Source Server Version : 90104
 Source Host           : localhost
 Source Database       : willyouacceptthisrose
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 90104
 File Encoding         : utf-8

 Date: 02/15/2013 15:26:52 PM
*/

-- ----------------------------
--  Sequence structure for "girls_id_seq"
-- ----------------------------
DROP SEQUENCE IF EXISTS "girls_id_seq";
CREATE SEQUENCE "girls_id_seq" INCREMENT 1 START 51 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "girls_id_seq" OWNER TO "nulogy";

-- ----------------------------
--  Sequence structure for "users_id_seq"
-- ----------------------------
DROP SEQUENCE IF EXISTS "users_id_seq";
CREATE SEQUENCE "users_id_seq" INCREMENT 1 START 1 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "users_id_seq" OWNER TO "nulogy";

-- ----------------------------
--  Sequence structure for "weeks_id_seq"
-- ----------------------------
DROP SEQUENCE IF EXISTS "weeks_id_seq";
CREATE SEQUENCE "weeks_id_seq" INCREMENT 1 START 1 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "weeks_id_seq" OWNER TO "nulogy";

-- ----------------------------
--  Table structure for "weeks"
-- ----------------------------
DROP TABLE IF EXISTS "weeks";
CREATE TABLE "weeks" (
	"id" int4 NOT NULL DEFAULT nextval('weeks_id_seq'::regclass),
	"date" date NOT NULL,
	"first" int4 NOT NULL,
	"second" int4 NOT NULL,
	"third" int4 NOT NULL,
	"fourth" int4 NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "weeks" OWNER TO "nulogy";

-- ----------------------------
--  Table structure for "users"
-- ----------------------------
DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
	"id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
	"email" text NOT NULL,
	"name" text NOT NULL,
	"pick1" int4,
	"pick2" int4,
	"pick3" int4,
	"pick4" int4,
	"score" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "users" OWNER TO "nulogy";

-- ----------------------------
--  Table structure for "candidates"
-- ----------------------------
DROP TABLE IF EXISTS "candidates";
CREATE TABLE "candidates" (
	"id" int4 NOT NULL DEFAULT nextval('girls_id_seq'::regclass),
	"name" text NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "candidates" OWNER TO "nulogy";


-- ----------------------------
--  Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "girls_id_seq" OWNED BY "candidates"."id";
ALTER SEQUENCE "users_id_seq" OWNED BY "users"."id";
ALTER SEQUENCE "weeks_id_seq" OWNED BY "weeks"."id";
-- ----------------------------
--  Primary key structure for table "weeks"
-- ----------------------------
ALTER TABLE "weeks" ADD CONSTRAINT "weeks_pkey" PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "users"
-- ----------------------------
ALTER TABLE "users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "candidates"
-- ----------------------------
ALTER TABLE "candidates" ADD CONSTRAINT "girls_pkey" PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

