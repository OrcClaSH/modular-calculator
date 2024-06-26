import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
