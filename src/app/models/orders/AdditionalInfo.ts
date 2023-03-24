import Location from "src/app/models/Location";

export default interface AdditionalInfo {
    address?: Location,
    startDate?: Date,
    endDate?: Date,
    additionalInformation: string,
    pictures: File[]
}