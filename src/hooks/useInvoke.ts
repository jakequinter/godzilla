import { invoke } from '@tauri-apps/api';

const useInvoke = async <T>(command: string, args: Record<string, any>): Promise<T> => {
  try {
    return await invoke<T>(command, args);
  } catch (error) {
    if (typeof error === 'string') {
      throw new Error(error);
    } else {
      throw new Error('Unknown error');
    }
  }
};

export default useInvoke;
