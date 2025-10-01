export const isColors = Object.freeze({
    hidden: 'is-hidden',
    primary: 'is-primary',
    link: 'is-link',
    info: 'is-info',
    success: 'is-success',
    warning: 'is-warning',
    danger: 'is-danger',
    white: 'is-white',
    light: 'is-light',
    dark: 'is-dark',
    black: 'is-black',
    text: 'is-text',
    ghost: 'is-ghost',
});

export type IsColor = (typeof isColors)[keyof typeof isColors];

export const isSizes = Object.freeze({
    small: 'is-small',
    medium: 'is-medium',
    large: 'is-large',
    halfHeight: 'is-halfheight',
    fullHeight: 'is-fullheight',
});

export type IsSize = (typeof isSizes)[keyof typeof isSizes];
