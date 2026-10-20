import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const image = (filename: string) => `/images/products/${filename}.webp`;

type CategorySeed = {
  name: string;
  slug: string;
  image: string;
  parentSlug?: string;
};

const categories: CategorySeed[] = [
  { name: "Удилища", slug: "rods", image: image("feeder-rod") },
  { name: "Катушки", slug: "reels", image: image("spinning-reel") },
  { name: "Лески и шнуры", slug: "lines", image: image("braided-line") },
  { name: "Приманки", slug: "lures", image: image("minnow-wobbler") },
  { name: "Оснастка", slug: "terminal-tackle", image: image("fishing-hooks") },
  { name: "Кормушки и грузила", slug: "feeders-and-weights", image: image("method-feeder") },
  { name: "Хранение и сумки", slug: "storage", image: image("tackle-box") },
  { name: "Оборудование", slug: "equipment", image: image("landing-net") },
  { name: "Одежда", slug: "clothing", image: image("fishing-waders") },

  { name: "Фидерные удилища", slug: "feeder-rods", image: image("feeder-rod"), parentSlug: "rods" },
  {
    name: "Безынерционные катушки",
    slug: "spinning-reels",
    image: image("spinning-reel"),
    parentSlug: "reels",
  },
  {
    name: "Плетёные шнуры",
    slug: "braided-lines",
    image: image("braided-line"),
    parentSlug: "lines",
  },
  { name: "Воблеры", slug: "wobblers", image: image("minnow-wobbler"), parentSlug: "lures" },
  {
    name: "Силиконовые приманки",
    slug: "soft-lures",
    image: image("soft-plastic-lures"),
    parentSlug: "lures",
  },
  { name: "Крючки", slug: "hooks", image: image("fishing-hooks"), parentSlug: "terminal-tackle" },
  {
    name: "Фидерные кормушки",
    slug: "feeders",
    image: image("method-feeder"),
    parentSlug: "feeders-and-weights",
  },
  {
    name: "Рыболовные коробки",
    slug: "tackle-boxes",
    image: image("tackle-box"),
    parentSlug: "storage",
  },
  {
    name: "Рыболовные сумки",
    slug: "fishing-bags",
    image: image("fishing-bag"),
    parentSlug: "storage",
  },
  { name: "Подсаки", slug: "landing-nets", image: image("landing-net"), parentSlug: "equipment" },
  {
    name: "Кресла",
    slug: "fishing-chairs",
    image: image("fishing-chair"),
    parentSlug: "equipment",
  },
  {
    name: "Сигнализаторы поклёвки",
    slug: "bite-alarms",
    image: image("bite-alarms"),
    parentSlug: "equipment",
  },
  {
    name: "Палатки и укрытия",
    slug: "fishing-shelters",
    image: image("fishing-shelter"),
    parentSlug: "equipment",
  },
  { name: "Вейдерсы", slug: "waders", image: image("fishing-waders"), parentSlug: "clothing" },
];

type ProductSeed = {
  name: string;
  slug: string;
  description: string;
  categorySlug: string;
  price: string;
  quantity: number;
  image: string;
};

const products: ProductSeed[] = [
  {
    name: "Фидерное удилище River Pro 3.6 м",
    slug: "river-pro-feeder-rod",
    description: "Фидерное удилище для ловли на реке и водохранилище.",
    categorySlug: "feeder-rods",
    price: "189.00",
    quantity: 12,
    image: image("feeder-rod"),
  },
  {
    name: "Безынерционная катушка Stream 4000",
    slug: "stream-spinning-reel-4000",
    description: "Катушка размера 4000 для фидерной и спиннинговой рыбалки.",
    categorySlug: "spinning-reels",
    price: "145.00",
    quantity: 18,
    image: image("spinning-reel"),
  },
  {
    name: "Плетёный шнур Aqua Braid X8",
    slug: "aqua-braid-x8",
    description: "Восьмижильный плетёный шнур для точного контроля приманки.",
    categorySlug: "braided-lines",
    price: "48.90",
    quantity: 35,
    image: image("braided-line"),
  },
  {
    name: "Воблер Minnow 110",
    slug: "minnow-wobbler-110",
    description: "Воблер класса minnow для ловли хищной рыбы.",
    categorySlug: "wobblers",
    price: "29.90",
    quantity: 24,
    image: image("minnow-wobbler"),
  },
  {
    name: "Методная кормушка Flat Method 40 г",
    slug: "flat-method-feeder-40g",
    description: "Плоская методная кормушка для донной ловли.",
    categorySlug: "feeders",
    price: "9.50",
    quantity: 80,
    image: image("method-feeder"),
  },
  {
    name: "Силиконовые приманки Soft Shad",
    slug: "soft-shad-lures",
    description: "Набор мягких силиконовых приманок для хищной рыбы.",
    categorySlug: "soft-lures",
    price: "18.90",
    quantity: 40,
    image: image("soft-plastic-lures"),
  },
  {
    name: "Воблер Crank 65",
    slug: "crankbait-wobbler-65",
    description: "Компактный воблер типа crank для равномерной проводки.",
    categorySlug: "wobblers",
    price: "24.50",
    quantity: 27,
    image: image("crankbait-wobbler"),
  },
  {
    name: "Рыболовные крючки Strong Hook",
    slug: "strong-fishing-hooks",
    description: "Набор прочных крючков для различных оснасток.",
    categorySlug: "hooks",
    price: "7.90",
    quantity: 120,
    image: image("fishing-hooks"),
  },
  {
    name: "Коробка для снастей Tackle Box",
    slug: "tackle-box-organizer",
    description: "Коробка с отделениями для приманок и мелкой оснастки.",
    categorySlug: "tackle-boxes",
    price: "35.00",
    quantity: 20,
    image: image("tackle-box"),
  },
  {
    name: "Сумка рыболовная Carry Bag",
    slug: "fishing-carry-bag",
    description: "Вместительная сумка для хранения и переноски снастей.",
    categorySlug: "fishing-bags",
    price: "89.00",
    quantity: 15,
    image: image("fishing-bag"),
  },
  {
    name: "Подсак складной Landing Net",
    slug: "folding-landing-net",
    description: "Складной подсак для безопасного вываживания рыбы.",
    categorySlug: "landing-nets",
    price: "65.00",
    quantity: 16,
    image: image("landing-net"),
  },
  {
    name: "Кресло рыболовное Comfort Chair",
    slug: "comfort-fishing-chair",
    description: "Складное кресло для комфортной рыбалки.",
    categorySlug: "fishing-chairs",
    price: "169.00",
    quantity: 8,
    image: image("fishing-chair"),
  },
  {
    name: "Набор сигнализаторов Bite Alarm",
    slug: "bite-alarm-set",
    description: "Электронные сигнализаторы поклёвки для донной ловли.",
    categorySlug: "bite-alarms",
    price: "119.00",
    quantity: 11,
    image: image("bite-alarms"),
  },
  {
    name: "Рыболовное укрытие Fishing Shelter",
    slug: "fishing-shelter",
    description: "Укрытие для защиты от ветра и осадков на рыбалке.",
    categorySlug: "fishing-shelters",
    price: "349.00",
    quantity: 5,
    image: image("fishing-shelter"),
  },
  {
    name: "Вейдерсы Waterproof Waders",
    slug: "waterproof-fishing-waders",
    description: "Водонепроницаемые вейдерсы для рыбалки в воде.",
    categorySlug: "waders",
    price: "229.00",
    quantity: 10,
    image: image("fishing-waders"),
  },
];

async function main() {
  const categoryIds = new Map<string, string>();

  // Сначала создаём родительские категории, затем дочерние.
  for (const category of categories) {
    const parentId = category.parentSlug ? categoryIds.get(category.parentSlug) : null;

    if (category.parentSlug && !parentId) {
      throw new Error(`Parent category not found: ${category.parentSlug}`);
    }

    const record = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        image: category.image,
        parentId,
      },
      create: {
        name: category.name,
        slug: category.slug,
        image: category.image,
        parentId,
      },
    });

    categoryIds.set(category.slug, record.id);
  }

  // Создаём товары и связываем их с категориями.
  for (const product of products) {
    const categoryId = categoryIds.get(product.categorySlug);

    if (!categoryId) {
      throw new Error(`Product category not found: ${product.categorySlug}`);
    }

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        categoryId,
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        categoryId,
      },
    });
  }

  console.log(`Seed completed: ${categories.length} categories and ${products.length} products.`);
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
