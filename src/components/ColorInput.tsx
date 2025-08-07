import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface HexInputProps {
  value: string;
  onChange: (value: string) => void;
  onGuess: () => void;
  disabled?: boolean;
  className?: string;
}

export function HexInput({ value, onChange, onGuess, disabled, className }: HexInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onGuess();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    
    inputValue = inputValue.replace(/#/g, '');
    
    inputValue = inputValue.toUpperCase().slice(0, 6);
    
    inputValue = inputValue.replace(/[^0-9A-F]/g, '');
    
    onChange(inputValue);
  };

  return (
    <div className={cn("max-w-md mx-auto", className)}>
      <label htmlFor="hex-input" className="block text-sm font-medium text-foreground mb-2">
        Enter hex color code:
      </label>
      <div className="flex gap-3 items-center">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground font-mono text-lg pointer-events-none">
            #
          </span>
          <input
            id="hex-input"
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="FF0000"
            className="w-full pl-8 pr-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent font-mono text-lg bg-background text-foreground"
            maxLength={6}
          />
        </div>
        <Button 
          onClick={onGuess}
          disabled={disabled}
          className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 px-8 py-3"
        >
          Guess
        </Button>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Format: RRGGBB (e.g., FF0000 for red)
      </p>
    </div>
  );
}

interface RGBInputProps {
  values: { r: string; g: string; b: string };
  onChange: (channel: 'r' | 'g' | 'b', value: string) => void;
  onGuess: () => void;
  disabled?: boolean;
  className?: string;
}

export function RGBInput({ values, onChange, onGuess, disabled, className }: RGBInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onGuess();
    }
  };

  return (
    <div className={cn("max-w-md mx-auto", className)}>
      <label className="block mb-4 text-sm font-medium text-foreground">
        Enter RGB values (0-255):
      </label>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-red-600 dark:text-red-400">Red</label>
          <input
            type="text"
            value={values.r}
            onChange={(e) => onChange('r', e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="255"
            className="px-4 py-3 w-full font-mono text-lg text-center rounded-xl border border-input focus:ring-2 focus:ring-red-500 focus:border-transparent bg-background text-foreground"
            maxLength={3}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-green-600 dark:text-green-400">Green</label>
          <input
            type="text"
            value={values.g}
            onChange={(e) => onChange('g', e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="255"
            className="px-4 py-3 w-full font-mono text-lg text-center rounded-xl border border-input focus:ring-2 focus:ring-green-500 focus:border-transparent bg-background text-foreground"
            maxLength={3}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">Blue</label>
          <input
            type="text"
            value={values.b}
            onChange={(e) => onChange('b', e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="255"
            className="px-4 py-3 w-full font-mono text-lg text-center rounded-xl border border-input focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
            maxLength={3}
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button 
          onClick={onGuess}
          disabled={disabled}
          className="px-8 py-3 bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700"
        >
          Guess
        </Button>
      </div>
      <p className="mt-2 text-sm text-center text-muted-foreground">
        Each value should be between 0 and 255
      </p>
    </div>
  );
} 