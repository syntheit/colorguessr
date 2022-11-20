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

  public static applyOpacity = (c: Color, opacity: number) => {
    const r = opacity * c.r + (1 - opacity),
      g = opacity * c.g + (1 - opacity),
      b = opacity * c.b + (1 - opacity);
    return new Color({ r, g, b });
  };

  public static useLight = (c: Color) => {
    return c.r * 0.299 + c.g * 0.587 + c.b * 0.114 < 150 ? true : false;
  };

  private randomColorVal = () => {
    return Math.floor(Math.random() * 255);
  };

  public toRGBString = () => {
    return `(${this.r}, ${this.g}, ${this.b})`;
  };

  private componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  // if there's 00, it only returns one zero
  public toHexString = () => {
    return (
      "#" +
      this.componentToHex(this.r) +
      this.componentToHex(this.g) +
      this.componentToHex(this.b)
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
