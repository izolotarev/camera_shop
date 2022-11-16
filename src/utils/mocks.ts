import { ProductType, ReviewType } from '../types/types';
import { datatype, lorem, image, name } from 'faker';

const { number } = datatype;
const { paragraph, word } = lorem;
const { imageUrl } = image;
const { firstName, lastName } = name;
const person = `${firstName()} ${lastName()}`;


export const makeFakeProduct = (): ProductType => ({
  id: number(),
  name: word(),
  vendorCode: word(),
  type: word(),
  category: word(),
  description: paragraph(),
  level: word(),
  rating: number({ min: 1, max: 5}),
  price: number(),
  previewImg: imageUrl(),
  previewImg2x: imageUrl(),
  previewImgWebp: imageUrl(),
  previewImgWebp2x: imageUrl(),
  reviewCount: number()
});

export const makeFakeReview = (): ReviewType => ({
  id: number().toString(),
  userName: person,
  advantage: paragraph(),
  disadvantage: paragraph(),
  review: paragraph(),
  rating: number({ min: 1, max: 5}),
  createAt: '2022-07-31T21:00:07.282Z',
  cameraId: number(),
});
