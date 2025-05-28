import { inAction } from '../src/action';
import { ActionInput, Day } from '../src/types';

describe('inAction()', () => {
  let setOutput: jest.Mock;
  let setFailed: jest.Mock;
  let logInfo: jest.Mock;
  let getInput: jest.Mock;

  beforeEach(() => {
    setOutput = jest.fn();
    setFailed = jest.fn();
    logInfo = jest.fn();
    getInput = jest.fn();
  });

  const run = (timezone: string) => {
    getInput.mockReturnValue(timezone);
    const mockInput: ActionInput = {
      getInput,
      setOutput,
      setFailed,
      logInfo,
    };
    inAction(mockInput);
  };

  describe('valid timezone tests', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('sets correct outputs for Monday', () => {
      const mondayDate = new Date('2025-05-26T12:00:00Z');
      jest.setSystemTime(mondayDate);

      run('UTC');

      expect(setOutput).toHaveBeenCalledWith('dayIndex', Day.Monday);
      expect(setOutput).toHaveBeenCalledWith('dayName', 'Monday');
      expect(setOutput).toHaveBeenCalledWith('failed', false);
      expect(logInfo).toHaveBeenCalledWith(expect.stringContaining('Today is Monday'));
      expect(setFailed).not.toHaveBeenCalled();
    });

    test('sets correct outputs for Sunday', () => {
      const sundayDate = new Date('2025-05-25T12:00:00Z');
      jest.setSystemTime(sundayDate);

      run('UTC');

      expect(setOutput).toHaveBeenCalledWith('dayIndex', Day.Sunday);
      expect(setOutput).toHaveBeenCalledWith('dayName', 'Sunday');
      expect(setOutput).toHaveBeenCalledWith('failed', false);
      expect(logInfo).toHaveBeenCalledWith(expect.stringContaining('Today is Sunday'));
      expect(setFailed).not.toHaveBeenCalled();
    });

    test('blocks deployment on Friday', () => {
      const fridayDate = new Date('2025-05-30T12:00:00Z');
      jest.setSystemTime(fridayDate);

      run('UTC');

      expect(setOutput).toHaveBeenCalledWith('failed', true);
      expect(setFailed).toHaveBeenCalledWith(expect.stringContaining('Friday'));
    });
  });

  describe('timezone handling', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('uses UTC as default timezone when none provided', () => {
      const mondayDate = new Date('2025-05-26T12:00:00Z');
      jest.setSystemTime(mondayDate);

      run('');

      expect(setOutput).toHaveBeenCalledWith('dayIndex', Day.Monday);
      expect(setFailed).not.toHaveBeenCalled();
    });

    test('handles different timezones correctly', () => {
      const mondayDate = new Date('2025-05-26T12:00:00Z');
      jest.setSystemTime(mondayDate);

      run('America/New_York');

      expect(setOutput).toHaveBeenCalledWith('dayIndex', Day.Monday);
      expect(setFailed).not.toHaveBeenCalled();
    });

    test('invalid timezone triggers failure', () => {
      run('Invalid/Zone');

      expect(setFailed).toHaveBeenCalledWith(expect.stringContaining('not valid'));
      expect(setOutput).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
      jest.restoreAllMocks();
    });

    test('handles unexpected errors gracefully', () => {
      // Mock Date.prototype.toLocaleString to throw an error
      const mockError = new Error('Unexpected error');
      jest.spyOn(Date.prototype, 'toLocaleString').mockImplementation(() => {
        throw mockError;
      });

      run('UTC');

      expect(setFailed).toHaveBeenCalledWith('Timezone: UTC is not valid. Please provide a valid timezone.');
      expect(setOutput).not.toHaveBeenCalled();
      expect(logInfo).not.toHaveBeenCalled();
    });

    test('handles non-Error objects gracefully', () => {
      // Mock Date.prototype.toLocaleString to throw a non-Error object
      jest.spyOn(Date.prototype, 'toLocaleString').mockImplementation(() => {
        throw 'String error';
      });

      run('UTC');

      expect(setFailed).toHaveBeenCalledWith('Timezone: UTC is not valid. Please provide a valid timezone.');
      expect(setOutput).not.toHaveBeenCalled();
      expect(logInfo).not.toHaveBeenCalled();
    });
  });
});

