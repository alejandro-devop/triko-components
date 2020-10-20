/**
 * This function is used to format the day number
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param number
 * @returns {string}
 */
export const formatNumber = number => `${number < 10 ? '0' : ''}${number}`;
