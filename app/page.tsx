import { BirthdayExperience } from "@/components/birthday/BirthdayExperience";
import { WelcomeScene } from "@/components/birthday/WelcomeScene";
import { ThroneScene } from "@/components/birthday/ThroneScene";
import { RhymeScene } from "@/components/birthday/RhymeScene";
import { GalleryScene } from "@/components/birthday/GalleryScene";
import { GameScene } from "@/components/birthday/GameScene";
import { ParadeScene } from "@/components/birthday/ParadeScene";
import { BirthdayReveal } from "@/components/birthday/BirthdayReveal";
import { ClosingScene } from "@/components/birthday/ClosingScene";

export default function Home() {
  return (
    <BirthdayExperience>
      <WelcomeScene />
      <ThroneScene />
      <RhymeScene />
      <GalleryScene />
      <GameScene />
      <ParadeScene />
      <BirthdayReveal />
      <ClosingScene />
    </BirthdayExperience>
  );
}
