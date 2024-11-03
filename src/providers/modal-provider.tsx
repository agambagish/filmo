import { getSupportedCities } from "@/actions/get-supported-cities";
import { SelectCityModal } from "@/components/modals/select-city-modal";

export const ModalProvider = () => {
  return (
    <>
      <SelectCityModal supportedCitiesPromise={getSupportedCities()} />
    </>
  );
};
