import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MIN_REVIEW_LENGTH } from '../../const/const';
import { useAppDispatch } from '../../hooks/hooks';
import useEscapeKey from '../../hooks/useEscapeKey';
import { clearPostReviewError, clearPostReviewStatus, closeAddReviewPopup, openAddReviewSuccessPopup } from '../../store/actions/actions';
import { fetchReviews, postReview } from '../../store/actions/api.actions';
import { getAddReviewPopupOpenedStatus, getReviewPostError, getReviewPostStatus } from '../../store/reducers/reviews/reviews-selectors';
import { PostReviewType } from '../../types/types';
import useTrapFocus from '../../hooks/useTrapFocus';
import { toggleBodyScroll } from '../../utils/utils';

type AddReviewPopupParams = {
  id: string;
}

function AddReviewPopup():JSX.Element {
  const params = useParams<AddReviewPopupParams>();
  const id = parseInt(params.id ?? '', 10);

  const isPostSuccessfull = useSelector(getReviewPostStatus);
  const isPostError = useSelector(getReviewPostError);

  const [disabledForm, setDisabledForm] = useState(false);

  const popupActive = useSelector(getAddReviewPopupOpenedStatus);

  const dispatch = useAppDispatch();

  const handlePopupClose = () => {
    dispatch(closeAddReviewPopup());
    toggleBodyScroll(false);
  };

  useEscapeKey(handlePopupClose);
  useTrapFocus(popupActive);

  const [comment, setComment] = useState<PostReviewType>({
    rating: undefined,
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    cameraId: id
  });

  const {rating, userName, advantage, disadvantage, review, cameraId} = comment;

  const [ratingTouched, setRatingTouched] = useState(false);
  const [userNameTouched, setUserNameTouched] = useState(false);
  const [advantagesTouched, setAdvantageTouched] = useState(false);
  const [disadvantagesTouched, setDisadvantageTouched] = useState(false);
  const [commentTouched, setCommentTouched] = useState(false);
  const [submitTouched, setSubmitTouched] = useState(false);

  const [ratingValid, setRatingValid] = useState(false);
  const [userNameValid, setUserNameValid] = useState(false);
  const [advantageValid, setAdvantageValid] = useState(false);
  const [disadvantageValid, setDisadvantageValid] = useState(false);
  const [commentValid, setCommentValid] = useState(false);

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    let isFormValid = false;
    if (ratingValid && userNameValid && advantageValid && disadvantageValid && commentValid) {
      isFormValid = true;
    }
    setFormValid(isFormValid);
  }, [ratingValid, userNameValid, advantageValid, disadvantageValid, commentValid]);

  const handleBlur = (evt: SyntheticEvent) => {
    const input = evt.target;

    if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
      switch (input.name) {
        case 'user-name':
          setUserNameTouched(true);
          break;
        case 'user-plus':
          setAdvantageTouched(true);
          break;
        case 'user-minus':
          setDisadvantageTouched(true);
          break;
        case 'user-comment':
          setCommentTouched(true);
          break;
      }
    }
  };

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setComment({
      rating: parseInt(evt.target.value, 10),
      userName,
      advantage,
      disadvantage,
      review,
      cameraId
    });
  };

  useEffect(() => {
    let isRatingValid = false;
    if (rating && rating > 0) {
      isRatingValid = true;
    }
    setRatingValid(isRatingValid);
  }, [rating]);

  const handleUserNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setComment({
      rating,
      userName: evt.target.value,
      advantage,
      disadvantage,
      review,
      cameraId
    });

    let isUserNameValid = false;

    if (evt.target.value.length > 0) {
      isUserNameValid = true;
    }
    setUserNameValid(isUserNameValid);
  };

  const handleAdvantagesChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setComment({
      rating,
      userName,
      advantage: evt.target.value,
      disadvantage,
      review,
      cameraId
    });

    let isAdvantageValid = false;
    if (evt.target.value.length > 0) {
      isAdvantageValid = true;
    }
    setAdvantageValid(isAdvantageValid);
  };

  const handleDisadvantagesChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setComment({
      rating,
      userName,
      advantage,
      disadvantage: evt.target.value,
      review,
      cameraId
    });

    let isDisadvantageValid = false;
    if (evt.target.value.length > 0) {
      isDisadvantageValid = true;
    }
    setDisadvantageValid(isDisadvantageValid);
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment({
      rating,
      userName,
      advantage,
      disadvantage,
      review: evt.target.value,
      cameraId
    });

    let isCommentValid = false;
    if (evt.target.value.length >= MIN_REVIEW_LENGTH) {
      isCommentValid = true;
    }
    setCommentValid(isCommentValid);
  };

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();

    setRatingTouched(true);
    setUserNameTouched(true);
    setAdvantageTouched(true);
    setDisadvantageTouched(true);
    setCommentTouched(true);
    setSubmitTouched(true);

    if (formValid) {
      setDisabledForm(true);
      dispatch(postReview(comment));
    }
  };

  useEffect(() => {
    if (isPostSuccessfull) {
      setComment({
        rating: undefined,
        userName: '',
        advantage: '',
        disadvantage: '',
        review: '',
        cameraId: id
      });

      resetState();
      setDisabledForm(false);
      dispatch(clearPostReviewStatus());
      dispatch(closeAddReviewPopup());
      dispatch(openAddReviewSuccessPopup());
      dispatch(fetchReviews(id));
    }
    if (isPostError) {
      setDisabledForm(false);
      dispatch(clearPostReviewError());
    }
  }, [dispatch, id, isPostError, isPostSuccessfull]);

  const resetState = () => {
    setRatingTouched(false);
    setUserNameTouched(false);
    setAdvantageTouched(false);
    setDisadvantageTouched(false);
    setCommentTouched(false);
    setSubmitTouched(false);

    setRatingValid(false);
    setUserNameValid(false);
    setAdvantageValid(false);
    setDisadvantageValid(false);
    setCommentValid(false);
    setFormValid(false);
  };

  return (
    <div className={`modal ${popupActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handlePopupClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleSubmit}>
              <div className="form-review__rate">
                <fieldset className={`rate form-review__item ${ratingTouched && !ratingValid ? 'is-invalid' : ''}`}>
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      <input className="visually-hidden" id="star-5" name="rate" type="radio" value="5" onChange={handleRatingChange} disabled={disabledForm} checked={comment.rating === 5}/>
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4" onChange={handleRatingChange} disabled={disabledForm} checked={comment.rating === 4}/>
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3" onChange={handleRatingChange} disabled={disabledForm} checked={comment.rating === 3}/>
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2" onChange={handleRatingChange} disabled={disabledForm} checked={comment.rating === 2}/>
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1" onChange={handleRatingChange} disabled={disabledForm} checked={comment.rating === 1}/>
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    </div>
                    <div className="rate__progress"><span className="rate__stars">{rating ?? 0}</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className={`custom-input form-review__item ${userNameTouched && !userNameValid ? 'is-invalid' : ''} ${userNameTouched && userNameValid ? 'is-valid' : ''}`}>
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" name="user-name" placeholder="Введите ваше имя" onBlur={handleBlur} onChange={handleUserNameChange} value={comment.userName} disabled={disabledForm}/>
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className={`custom-input form-review__item ${advantagesTouched && !advantageValid ? 'is-invalid' : ''} ${advantagesTouched && advantageValid ? 'is-valid' : ''}`}>
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" name="user-plus" placeholder="Основные преимущества товара" onBlur={handleBlur} onChange={handleAdvantagesChange} value={comment.advantage} disabled={disabledForm}/>
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className={`custom-input form-review__item ${disadvantagesTouched && !disadvantageValid ? 'is-invalid' : ''} ${disadvantagesTouched && disadvantageValid ? 'is-valid' : ''}`}>
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" name="user-minus" placeholder="Главные недостатки товара" onBlur={handleBlur} onChange={handleDisadvantagesChange} value={comment.disadvantage} disabled={disabledForm}/>
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className={`custom-textarea form-review__item ${commentTouched && !commentValid ? 'is-invalid' : ''} ${commentTouched && commentValid ? 'is-valid' : ''}`}>
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea name="user-comment" minLength={MIN_REVIEW_LENGTH} placeholder="Поделитесь своим опытом покупки" onBlur={handleBlur} onChange={handleCommentChange} value={comment.review} disabled={disabledForm}></textarea>
                  </label>
                  <div className="custom-textarea__error">Нужно добавить комментарий</div>
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit" disabled={submitTouched && !formValid}>Отправить отзыв</button>
            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handlePopupClose}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddReviewPopup;
