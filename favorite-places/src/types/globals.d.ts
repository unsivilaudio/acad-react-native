import { RootStackParamsList } from '@/types/root-stack-params-list';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamsList {}
    }
}
