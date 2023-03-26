import Location from "src/app/models/Location";

export default interface AdditionalInfo {
    address?: Location,
    startDate?: string,
    endDate?: string,
    additionalInformation: string,
    pictures: File[]
}