import { Itinerary } from "app/features/types"
import useNavigation from "app/features/shared/routing/useNavigation"


export const useRedirectToCorrectItineraryPage = () => {
  const { navigateTo } = useNavigation();

  const redirectToCorrectItineraryPage = (itineraries?: Itinerary[], itineraryId?: string) => {
    if (!itineraries) {
      return;
    }

    if (itineraries.length === 0) {
      navigateTo("/lijst-instellingen");
    }

    if (itineraries.length === 1) {
      navigateTo("/lijst/:itineraryId", { itineraryId: itineraries[0].id.toString() });
    }

    if (itineraries.length > 1 && !itineraryId) {
      navigateTo("/kies-looplijst");
    }
  };

  return { redirectToCorrectItineraryPage };
};