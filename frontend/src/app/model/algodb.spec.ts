import { algodb } from './algodb';

describe('algodb', () => {
  it('should create an instance', () => {
    expect(new algodb()).toBeTruthy();
  });
});
