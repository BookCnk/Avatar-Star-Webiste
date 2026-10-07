"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Crown,
  Medal,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

type RankingCategory = "eliminations" | "victories" | "rating";
type SlideDirection = "previous" | "next";

interface RankedPlayer {
  name: string;
  image: string;
  score: number;
}

interface RankingBoard {
  id: RankingCategory;
  icon: typeof Crosshair;
  players: RankedPlayer[];
}

interface RankingPreviewProps {
  board: RankingBoard;
  categoryLabel: string;
  unitLabel: string;
  position: "previous" | "next";
}

const playerProfiles = [
  { name: "LunaNova", image: "/images/characters/assassin.png" },
  { name: "RyuStorm", image: "/images/characters/gunner.png" },
  { name: "AstraMint", image: "/images/characters/guardian.png" },
  { name: "MochiByte", image: "/images/characters/biochemist.png" },
  { name: "SkyRanger", image: "/images/characters/gunner.png" },
  { name: "NekoRush", image: "/images/characters/assassin.png" },
  { name: "Cloudshot", image: "/images/characters/guardian.png" },
  { name: "BombBerry", image: "/images/characters/biochemist.png" },
  { name: "PixelKnight", image: "/images/characters/gunner.png" },
  { name: "StarMallow", image: "/images/characters/assassin.png" },
] as const;

const createPlayers = (scores: number[]): RankedPlayer[] =>
  playerProfiles.map((player, index) => ({
    ...player,
    score: scores[index],
  }));

const rankingBoards: RankingBoard[] = [
  {
    id: "eliminations",
    icon: Crosshair,
    players: createPlayers([2924097, 21420, 18500, 15300, 12800, 9600, 7400, 5200, 3100, 1500]),
  },
  {
    id: "victories",
    icon: ShieldCheck,
    players: createPlayers([842, 798, 755, 701, 664, 620, 588, 541, 503, 476]),
  },
  {
    id: "rating",
    icon: Star,
    players: createPlayers([9820, 9540, 9315, 9040, 8810, 8575, 8340, 8105, 7880, 7650]),
  },
];

const podiumOrder = [1, 0, 2] as const;

function RankingPreview({ board, categoryLabel, unitLabel, position }: RankingPreviewProps) {
  const leader = board.players[0];

  return (
    <article
      className={`hall-of-fame-ghost hall-of-fame-ghost-${position}`}
      data-ranking-card={position}
      aria-label={`${position === "previous" ? "Previous" : "Next"} ranking category: ${categoryLabel}`}
      aria-hidden="true"
    >
      <span>{categoryLabel}</span>
      <div className="hall-of-fame-preview-leader">
        <span className="hall-of-fame-preview-rank">1</span>
        <span className="hall-of-fame-preview-avatar">
          <Image src={leader.image} alt="" fill sizes="48px" className="hall-of-fame-avatar-image" />
        </span>
        <strong>{leader.name}</strong>
        <em>{leader.score.toLocaleString()} {unitLabel}</em>
      </div>
      <ol className="hall-of-fame-preview-list">
        {board.players.slice(1, 4).map((player, index) => (
          <li key={player.name}>
            <span>{index + 2}</span>
            <strong>{player.name}</strong>
            <em>{player.score.toLocaleString()}</em>
          </li>
        ))}
      </ol>
    </article>
  );
}

export function HallOfFame() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<RankingCategory>("eliminations");
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("next");
  const activeBoard = rankingBoards.find((board) => board.id === activeCategory) ?? rankingBoards[0];
  const categoryIds = rankingBoards.map((board) => board.id);
  const activeIndex = categoryIds.indexOf(activeCategory);
  const previousBoard = rankingBoards[(activeIndex - 1 + rankingBoards.length) % rankingBoards.length];
  const nextBoard = rankingBoards[(activeIndex + 1) % rankingBoards.length];

  const selectAdjacentCategory = (direction: -1 | 1) => {
    const currentIndex = categoryIds.indexOf(activeCategory);
    const nextIndex = (currentIndex + direction + categoryIds.length) % categoryIds.length;
    setSlideDirection(direction === 1 ? "next" : "previous");
    setActiveCategory(categoryIds[nextIndex]);
  };

  const selectCategory = (category: RankingCategory) => {
    const currentIndex = categoryIds.indexOf(activeCategory);
    const nextIndex = categoryIds.indexOf(category);
    setSlideDirection(nextIndex > currentIndex ? "next" : "previous");
    setActiveCategory(category);
  };

  return (
    <section id="community" className="hall-of-fame" aria-labelledby="hall-of-fame-title">
      <div className="hall-of-fame-background" aria-hidden="true">
        <Image
          src="/images/backgrounds/footer-img.png"
          alt=""
          fill
          sizes="100vw"
          className="hall-of-fame-background-desktop"
        />
        <Image
          src="/images/backgrounds/footer-mobile.png"
          alt=""
          fill
          sizes="100vw"
          className="hall-of-fame-background-mobile"
        />
        <div className="hall-of-fame-skywash" />
        <div className="hall-of-fame-starlight" />
      </div>

      <div className="hall-of-fame-content">
        <header className="hall-of-fame-heading">
          <span className="hall-of-fame-eyebrow">
            <Sparkles aria-hidden="true" />
            {t.hallOfFame.season}
          </span>
          <h2 id="hall-of-fame-title">HALL OF FAME</h2>
          <p>{t.hallOfFame.subtitle}</p>
        </header>

        <div
          className="hall-of-fame-tabs"
          role="tablist"
          aria-label={t.hallOfFame.tabsLabel}
        >
          {rankingBoards.map((board) => {
            const Icon = board.icon;
            const isActive = board.id === activeCategory;

            return (
              <button
                key={board.id}
                id={`hall-tab-${board.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="hall-ranking-panel"
                tabIndex={isActive ? 0 : -1}
                data-active={isActive}
                onClick={() => selectCategory(board.id)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    selectAdjacentCategory(-1);
                  }
                  if (event.key === "ArrowRight") {
                    event.preventDefault();
                    selectAdjacentCategory(1);
                  }
                }}
              >
                <Icon aria-hidden="true" />
                <span>{t.hallOfFame.categories[board.id]}</span>
              </button>
            );
          })}
        </div>

        <div className="hall-of-fame-stage" data-carousel-direction={slideDirection}>
          <RankingPreview
            key={`${previousBoard.id}-${slideDirection}`}
            board={previousBoard}
            categoryLabel={t.hallOfFame.categories[previousBoard.id]}
            unitLabel={t.hallOfFame.units[previousBoard.id]}
            position="previous"
          />

          <button
            type="button"
            className="hall-of-fame-carousel-control hall-of-fame-carousel-control-previous"
            onClick={() => selectAdjacentCategory(-1)}
            aria-label="Previous ranking category"
          >
            <ChevronLeft aria-hidden="true" />
          </button>

          <div
            key={activeCategory}
            id="hall-ranking-panel"
            className="hall-of-fame-board"
            role="tabpanel"
            aria-labelledby={`hall-tab-${activeCategory}`}
            data-slide-direction={slideDirection}
          >
            <div className="hall-of-fame-ribbon">
              <Trophy aria-hidden="true" />
              <span>{t.hallOfFame.categories[activeCategory]}</span>
              <Trophy aria-hidden="true" />
            </div>

            <div className="hall-of-fame-board-meta">
              <span>{t.hallOfFame.weekly}</span>
              <strong>{t.hallOfFame.updated}</strong>
            </div>

            <div className="hall-of-fame-podium" aria-label={t.hallOfFame.topThree}>
              {podiumOrder.map((playerIndex) => {
                const player = activeBoard.players[playerIndex];
                const rank = playerIndex + 1;

                return (
                  <article
                    key={`${activeCategory}-${player.name}`}
                    className="hall-of-fame-finalist"
                    data-rank={rank}
                    aria-label={`Rank ${rank}`}
                  >
                    <div className="hall-of-fame-medal">
                      {rank === 1 ? <Crown aria-hidden="true" /> : <Medal aria-hidden="true" />}
                      <span>{rank}</span>
                    </div>
                    <div className="hall-of-fame-avatar">
                      <Image
                        src={player.image}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 112px, 82px"
                        className="hall-of-fame-avatar-image"
                      />
                    </div>
                    <strong>{player.name}</strong>
                    <span className="hall-of-fame-score">
                      {player.score.toLocaleString()} {t.hallOfFame.units[activeCategory]}
                    </span>
                    <div className="hall-of-fame-pedestal" aria-hidden="true">
                      <span>{rank}</span>
                    </div>
                  </article>
                );
              })}
            </div>

            <ol className="hall-of-fame-list" start={4} aria-label="Ranks 4 to 10">
              {activeBoard.players.slice(3).map((player, index) => {
                const rank = index + 4;

                return (
                  <li key={`${activeCategory}-${player.name}-row`}>
                    <span className="hall-of-fame-list-rank">{rank}</span>
                    <span className="hall-of-fame-list-avatar">
                      <Image
                        src={player.image}
                        alt=""
                        fill
                        sizes="32px"
                        className="hall-of-fame-avatar-image"
                      />
                    </span>
                    <strong>{player.name}</strong>
                    <span>{player.score.toLocaleString()} {t.hallOfFame.units[activeCategory]}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          <button
            type="button"
            className="hall-of-fame-carousel-control hall-of-fame-carousel-control-next"
            onClick={() => selectAdjacentCategory(1)}
            aria-label="Next ranking category"
          >
            <ChevronRight aria-hidden="true" />
          </button>

          <RankingPreview
            key={`${nextBoard.id}-${slideDirection}`}
            board={nextBoard}
            categoryLabel={t.hallOfFame.categories[nextBoard.id]}
            unitLabel={t.hallOfFame.units[nextBoard.id]}
            position="next"
          />
        </div>
      </div>
    </section>
  );
}
