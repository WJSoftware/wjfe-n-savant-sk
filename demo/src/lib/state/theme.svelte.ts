export class ThemeState {
    current: 'light' | 'dark' | 'system' = $state('system');
}

export default new ThemeState();
