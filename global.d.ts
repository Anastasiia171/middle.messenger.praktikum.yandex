declare global {
    interface Window {
      navigate: (page: string) => void;
    }
}

export {};
