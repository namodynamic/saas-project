import React from "react";
import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>

      <section className="home-section">
        <CompanionCard
          id="123"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="Science"
          duration={45}
          color="#E5D0FF"
        />
        <CompanionCard
          id="456"
          name="Countsy  the Math Wizard"
          topic="Derivatives & Integrals"
          subject="Mathematics"
          duration={30}
          color="#FFB6C1"
        />
        <CompanionCard
          id="789"
          name="Lingo the Vocabulary Virtuoso"
          topic="Language"
          subject="English Literature"
          duration={30}
          color="#ADD8E6"
        />
      </section>

      <section className="home-section">
        <CompanionList
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
