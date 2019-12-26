/**
 * Projede kullanılan bütün renkler burada tanımlanmalı ve bu dosyadan import edilmelidir.
 * Gereksiz tanımlamalardan uzak durulmalı.
 *
 * Örneğin: splashBackground, mainBackground gibi tanımlanmamalıdır.
 * Bazı istisnai durumlar dışında aynı renkler mümkün mertebe ortak gruplanmalıdır.
 *
 * Bunun yerine:
 *   Ana Renkler       : primary, secondary, light, dark, muted
 *   Durum Renkleri    : danger, success, info, warning
 *   İstisnai Durumlar : shadow, card
 *
 *
 * Renk kodununun ismini bulan site:
 *   https://www.color-blindness.com/color-name-hue/
 *
 *
 * Örnek kullanım:
 * import { colors } from 'assets';
 *
 * colors.primary
 */

const colors = {
  primary: '#ff332d',
  secondary: '#EE7d28',
  lightGray: '#D1D1D6',
  brightBlue60: '#005cff99',
  brightBlue: '#005cff',
  brightSkyBlue: '#00b7ff',
  brightSkyBlue60: '#00b7ff99',
  background: '#e3f0f6',
  button: '#cbd6db',
  success: '#44d7a4',
  black: '#000000',
  muted: '#8c8c8c',
  white: '#ffffff',
  black50: 'rgba(0,0,0,0.5)',
  grey: '#d5d5d5',
  lightGrey: '#fafafa',
};
export default colors;
