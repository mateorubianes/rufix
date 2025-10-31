type Listener = () => void;

class UpdateEmitter {
  private static listeners: Listener[] = [];

  static subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  static emit() {
    this.listeners.forEach((listener) => listener());
  }
}

export const updateEvents = UpdateEmitter;
