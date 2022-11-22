const Bridge = require('./Bridge');
const Moving = require('./Moving');
const GameCommand = require('./GameCommand');
const { GAME, SYMBOL } = require('../utils/constant');

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridge;

  #currentIndex;

  #tryCount;

  #topSide;

  #downSide;

  constructor() {
    this.#currentIndex = 0;
    this.#tryCount = 1;
    this.#topSide = [];
    this.#downSide = [];
  }

  setBridge(size) {
    const bridge = new Bridge(size);
    this.#bridge = bridge.getBridge();
  }

  static setMoving(next) {
    Moving.setMoving(next);
  }

  static setGameCommand(gameCommand) {
    GameCommand.setGameCommand(gameCommand);
  }

  setTopSide(isSuccess) {
    if (isSuccess) {
      this.#topSide.push(SYMBOL.SUCCESS);
      this.#downSide.push(SYMBOL.BLANK);
    }

    if (!isSuccess) {
      this.#topSide.push(SYMBOL.FAIL);
      this.#downSide.push(SYMBOL.BLANK);
    }
  }

  setDownSide(isSuccess) {
    if (isSuccess) {
      this.#topSide.push(SYMBOL.BLANK);
      this.#downSide.push(SYMBOL.SUCCESS);
    }

    if (!isSuccess) {
      this.#topSide.push(SYMBOL.BLANK);
      this.#downSide.push(SYMBOL.FAIL);
    }
  }

  getMap() {
    return { topSide: this.#topSide, downSide: this.#downSide };
  }

  getTryCount() {
    return this.#tryCount;
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(next) {
    const isSuccess = next === this.#bridge[this.#currentIndex] ? 1 : 0;

    if (next === GAME.UP) this.setTopSide(isSuccess);
    if (next === GAME.DOWN) this.setDownSide(isSuccess);

    this.#currentIndex += 1;

    return isSuccess;
  }

  isEnd() {
    return this.#currentIndex === this.#bridge.length;
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {
    this.initialization();
    this.#tryCount += 1;
  }

  initialization() {
    this.#currentIndex = 0;
    this.#topSide = [];
    this.#downSide = [];
  }
}

module.exports = BridgeGame;
