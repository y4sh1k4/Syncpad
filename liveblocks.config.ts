declare global {
  interface Liveblocks {
    Storage: {
      leftMargin: number;
      rightMargin: number;
    };
    RoomInfo: {
      name: string;
      url: string;
    };
  }
}

export {};
