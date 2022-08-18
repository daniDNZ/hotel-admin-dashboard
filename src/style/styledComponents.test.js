import { render, screen } from '@testing-library/react';
import { Button } from './styledComponents';
import colors from './colors';

function HexToRgb(hex) {
  const red = parseInt(hex[1] + hex[2], 16);
  const green = parseInt(hex[3] + hex[4], 16);
  const blue = parseInt(hex[5] + hex[6], 16);
  return (`rgb(${red}, ${green}, ${blue})`);
}

describe('Button green', () => {
  render(<Button green>Boton verde</Button>);
  const button = screen.getByText(/Boton verde/);
  const style = window.getComputedStyle(button);

  test('Color green', () => {
    expect(style.color).toBe(HexToRgb(colors.hardGreen));
  });

  test('BgColor green', () => {
    expect(style.backgroundColor).toBe(HexToRgb(colors.lightGreen));
  });
});

describe('Button red', () => {
  render(<Button red>Boton rojo</Button>);
  const button = screen.getByText(/Boton rojo/);
  const style = window.getComputedStyle(button);

  test('Color red', () => {
    expect(style.color).toBe(HexToRgb(colors.red));
  });

  test('BgColor red', () => {
    expect(style.backgroundColor).toBe(HexToRgb(colors.lightRed));
  });
});
