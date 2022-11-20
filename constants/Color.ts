export class Color {
  r: number;
  g: number;
  b: number;

  public constructor();

  public constructor(x: number);

  public constructor({ r, g, b }: { r: number; g: number; b: number });

  public constructor(...args: any[]) {
    if (args.length === 0) {
      this.r = this.randomColorVal();
      this.g = this.randomColorVal();
      this.b = this.randomColorVal();
    } else if (args.length === 1 && args[0] === -1) {
      this.r = this.g = this.b = -1;
    } else if (args.length === 1) {
      const { r, g, b } = args[0];
      this.r = r;
      this.g = g;
      this.b = b;
    } else this.r = this.g = this.b = -1;
  }

  public static rgbToHex = (c: Color) => {
    let r = (+c.r).toString(16),
      g = (+c.g).toString(16),
      b = (+c.b).toString(16);
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    return "#" + r + g + b;
  };

  public static hexToRGB = (h: string) => {
    const r = "0x" + h[1] + h[2],
      g = "0x" + h[3] + h[4],
      b = "0x" + h[5] + h[6];
    return { r: +r, g: +g, b: +b };
  };

  private randomColorVal = () => {
    return Math.floor(Math.random() * 255);
  };

  private percentDiff = (a: number, b: number) => {
    return 100 * Math.abs((a - b) / ((a + b) / 2));
  };

  public toRGBString = () => {
    return `(${this.r}, ${this.g}, ${this.b})`;
  };

  public toHexString = () => {
    return (
      "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16)
    );
  };

  public percentDifference = (c: Color) => {
    // NaN when 0??
    return (
      ((Math.abs(this.r - c.r) / 256 +
        Math.abs(this.g - c.g) / 256 +
        Math.abs(this.b - c.b) / 256) /
        3) *
      100
    );
  };
}
