-- CreateTable
CREATE TABLE "books" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "author" VARCHAR,
    "year" SMALLINT,
    "total_pages" SMALLINT NOT NULL,
    "category_id" BIGINT NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_profiles" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "book_id" BIGINT NOT NULL,
    "profile_id" BIGINT NOT NULL,
    "status_id" BIGINT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "books_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_profiles_progress" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "book_profile" BIGINT NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "read_pages" SMALLINT NOT NULL,

    CONSTRAINT "books_profiles_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "category" VARCHAR NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statuses" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR NOT NULL,

    CONSTRAINT "statuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "books_profiles" ADD CONSTRAINT "books_profiles_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_profiles" ADD CONSTRAINT "books_profiles_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_profiles" ADD CONSTRAINT "books_profiles_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_profiles_progress" ADD CONSTRAINT "books_profiles_progress_book_profile_fkey" FOREIGN KEY ("book_profile") REFERENCES "books_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

