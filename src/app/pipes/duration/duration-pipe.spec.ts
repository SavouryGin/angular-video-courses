import { DurationPipe } from '.';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform duration less than 1 hour correctly', () => {
    expect(pipe.transform(45)).toBe('45min');
  });

  it('should transform duration exactly 1 hour correctly', () => {
    expect(pipe.transform(60)).toBe('1h 0min');
  });

  it('should transform duration more than 1 hour correctly', () => {
    expect(pipe.transform(75)).toBe('1h 15min');
  });

  it('should transform duration with multiple hours correctly', () => {
    expect(pipe.transform(135)).toBe('2h 15min');
  });

  it('should transform duration with no minutes correctly', () => {
    expect(pipe.transform(120)).toBe('2h 0min');
  });

  it('should transform duration of 0 minutes correctly', () => {
    expect(pipe.transform(0)).toBe('0min');
  });
});
