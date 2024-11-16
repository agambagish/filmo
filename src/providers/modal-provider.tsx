import { getAvailableNowPlaying } from "@/actions/get-available-now-playing";
import { getSupportedCities } from "@/actions/get-supported-cities";
import { AddNowPlayingModal } from "@/components/modals/add-now-playing-modal";
import { AddShowtimeModal } from "@/components/modals/add-showtime-modal";
import { CreateCinemaModal } from "@/components/modals/create-cinema-modal";
import { SelectCityModal } from "@/components/modals/select-city-modal";

export const ModalProvider = () => {
  return (
    <>
      <SelectCityModal supportedCitiesPromise={getSupportedCities()} />
      <CreateCinemaModal supportedCitiesPromise={getSupportedCities()} />
      <AddNowPlayingModal
        availableNowPlayingPromise={getAvailableNowPlaying()}
      />
      <AddShowtimeModal />
    </>
  );
};
