import { getSupportedCities } from "@/actions/get-supported-cities";
import { CreateCinemaModal } from "@/components/modals/create-cinema-modal";
import { SelectCityModal } from "@/components/modals/select-city-modal";

export const ModalProvider = () => {
  return (
    <>
      <SelectCityModal supportedCitiesPromise={getSupportedCities()} />
      <CreateCinemaModal supportedCitiesPromise={getSupportedCities()} />
    </>
  );
};
