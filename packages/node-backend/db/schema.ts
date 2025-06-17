import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const families = pgTable("families", {
  id: uuid().primaryKey().defaultRandom(),
});

export const accounts = pgTable("accounts", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  familyId: uuid()
    .notNull()
    .references(() => families.id, { onDelete: "cascade" }),
});

export const members = pgTable("members", {
  id: serial().primaryKey(),
  name: text(),
  familyId: uuid()
    .notNull()
    .references(() => families.id, { onDelete: "cascade" }),
});

export const recipes = pgTable("recipes", {
  id: uuid().primaryKey().notNull(),
  familyId: uuid()
    .notNull()
    .references(() => families.id, { onDelete: "cascade" }),
  recipeName: text().notNull(),
  description: text(),
  sourceLabel: text(),
  sourceUrl: text(),
  totalTime: integer(),
  prepTime: integer(),
  cookTime: integer(),
  serves: text(),
  imageUrl: text(), //Should probably abstract image out into its own table...
  imageAlt: text(),
  method: text(),
  notes: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const ingredients = pgTable("ingredients", {
  id: serial().primaryKey(),
  recipeId: uuid().references(() => recipes.id, { onDelete: "cascade" }),
  line: integer().notNull(),
  isHeading: boolean()
    .notNull()
    .$default(() => false),
  rawIngredient: text().notNull(),
});

export const schema = {
  accounts,
  families,
  recipes,
  ingredients,
  members,
};
