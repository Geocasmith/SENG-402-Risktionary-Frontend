import gameWords from "./../../resources/gameWords.json";
import injury from "./../../resources/images/injury.png";
import dataLoss from "./../../resources/images/data_loss.png";
import busFactor from "./../../resources/images/bus_factor.png";
import assignments from "./../../resources/images/assignments.png";
import procrastination from "./../../resources/images/procrastination.png";
import slowInternet from "./../../resources/images/slow_internet.png";
import argumentsImage from "./../../resources/images/arguments.png";
import knowledgeSilo from "./../../resources/images/knowledge_silo.png";
import sleepingIn from "./../../resources/images/sleeping_in.png";
import lastMinuteIntegration from "./../../resources/images/last_minute_integration.png";
import swineFlu from "./../../resources/images/swine_flu.png";
import jobs from "./../../resources/images/jobs.png";
import earthquake from "./../../resources/images/earthquake.png";
import acronyms from "./../../resources/images/acronyms.png";

const images: {
  injury: string;
  dataLoss: string;
  busFactor: string;
  assignments: string;
  procrastination: string;
  slowInternet: string;
  argumentsImage: string;
  knowledgeSilo: string;
  sleepingIn: string;
  lastMinuteIntegration: string;
  swineFlu: string;
  jobs: string;
  earthquake: string;
  acronyms: string;
  [key: string]: string;
} = {
  injury,
  dataLoss,
  busFactor,
  assignments,
  procrastination,
  slowInternet,
  argumentsImage,
  knowledgeSilo,
  sleepingIn,
  lastMinuteIntegration,
  swineFlu,
  jobs,
  earthquake,
  acronyms,
};


interface GameWordInfo {
  word: string;
  description: string;
  path: string;
}

class GameWordAccessor {
  private static data: Record<number, GameWordInfo> = gameWords;

  static getGameWordInfoByKey(key: number): GameWordInfo | null {
    if (this.data.hasOwnProperty(key)) {
      return this.data[key];
    }
    return null;
  }

  static getGameWordNameByKey(key: number): string | null {
    const gameWordInfo = this.getGameWordInfoByKey(key);
    return gameWordInfo ? gameWordInfo.word : null;
  }

  static getGameWordDescriptionByKey(key: number): string | null {
    const gameWordInfo = this.getGameWordInfoByKey(key);
    return gameWordInfo ? gameWordInfo.description : null;
  }

  static getGameWordPathByKey(key: number): string | undefined {
    const gameWordInfo = this.getGameWordInfoByKey(key);
    if (gameWordInfo) {
      return images[gameWordInfo.path];
    }
    return undefined;
  }
}

export default GameWordAccessor;
