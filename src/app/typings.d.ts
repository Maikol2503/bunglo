declare namespace go {
    class DoubleTreeLayout extends Layout {
      constructor(options?: any);
      directionFunction: (node: Node) => boolean;
      bottomRightOptions: any;
      topLeftOptions: any;
    }
  }

declare var go: any;