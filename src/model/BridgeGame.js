const BridgeRandomNumberGenerator = require('../BridgeRandomNumberGenerator');
const BridgeMaker = require('../BridgeMaker');

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridge;
  #map;
  #time;

  constructor() {
    this.#time = 0;
    this.topSide = [];
    this.downSide = [];
  }

  setBridge(size) {
    const bridge = BridgeMaker.makeBridge(size, () =>
      BridgeRandomNumberGenerator.generate()
    );
    console.log(bridge);
    this.#bridge = bridge;
  }

  setMap(next) {
    if (next === 'U') {
      this.topSide.push('O');
      this.downSide.push('X');
    }

    if (next === 'D') {
      this.topSide.push('X');
      this.downSide.push('O');
    }

    console.log(this.topSide);
    console.log(this.downSide);
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(next) {
    this.#time += 1;
    if (this.#time === this.#bridge.length) {
      return 2;
    }
    if (next !== this.#bridge[this.#time - 1]) {
      return 0;
    }
    return 1;
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {}
}

module.exports = BridgeGame;
