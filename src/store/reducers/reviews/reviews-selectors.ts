import { ReviewType, State } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getReviews = (state: State): ReviewType[] | undefined => state[NameSpace.reviews].reviews;
