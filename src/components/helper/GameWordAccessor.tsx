import gameWords from "./../../resources/gameWords.json";

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

  static getGameWordPathByKey(key: number): string | null {
    const gameWordInfo = this.getGameWordInfoByKey(key);
    return gameWordInfo ? gameWordInfo.path : null;
  }
}

export default GameWordAccessor;
