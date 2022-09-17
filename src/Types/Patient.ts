type Coding = { system: string; code: string; display: string }
type CodeableConcept = {
    coding: Coding
    text: string
}
type Identifier = {
    use: 'usual' | 'official' | 'temp' | 'secondary' | 'old'
    type: CodeableConcept
    system: string
    value: string
}
type Name = {
    use: 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden'
    text: string
    family: string
    given: string
}
type Period = { start: 'string'; end: 'string' }
type Telecom = {
    system: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other'
    value: string
    use: 'home' | 'work' | 'temp' | 'old' | 'mobile'
    period: Period
}
type Organization = {}

export type PatientResourceType = {
    id: string
    text: { status: string; div: string }
    identifier: Identifier
    passportNumber: Identifier
    residentNumber: Identifier
    medicalRecord: Identifier
    name: Name[]
    telecom: Telecom[]
    gender: 'male' | 'female' | 'other' | 'unknown'
    birthDate: string
    address: {
        room: string
        floor: string
        number: string
        alley: string
        lane: string
        section: string
        neighborhood: string
        use: 'home' | 'work' | 'temp' | 'old' | 'billing'
        type: 'postal' | 'physical' | 'both'
        text: string
        line: string
        city: string
        district: string
        postalCode: string
        country: string
    }[]
    maritalStatus: CodeableConcept[]
    photo: string
    contract: {
        relationShip: CodeableConcept[]
        name: Name
        telecom: Telecom[]
        period: Period
    }[]
    communication: {
        language: CodeableConcept
    }[]
    managingOrganization: Organization
}
