-- CreateTable
CREATE TABLE "Advert" (
    "id" TEXT NOT NULL,
    "paket" TEXT NOT NULL,
    "fiyat" INTEGER NOT NULL,
    "marka" TEXT NOT NULL,
    "model" INTEGER NOT NULL,
    "yil" INTEGER NOT NULL,
    "vites" TEXT NOT NULL,
    "km" INTEGER NOT NULL,
    "hasar" BOOLEAN NOT NULL,
    "motor" INTEGER NOT NULL,
    "garanti" TEXT NOT NULL,
    "arac_sahibi" TEXT NOT NULL,
    "konum" TEXT NOT NULL,
    "takas" BOOLEAN NOT NULL,
    "tel" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "aciklama" TEXT NOT NULL,
    "photos" TEXT[],
    "odeme_turu" BOOLEAN NOT NULL,

    CONSTRAINT "Advert_pkey" PRIMARY KEY ("id")
);
