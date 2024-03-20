import { RootDrawerParamsList } from '@/types/root-drawer-params-list';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamsList = {
    MealsOverview: {
        categoryId: string;
    };
    MealDetails: {
        mealId: string;
    };
    Home: NavigatorScreenParams<RootDrawerParamsList>;
};
