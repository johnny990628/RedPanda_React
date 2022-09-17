const Coding = [
    { label: 'System', name: 'system', type: 'string' },
    { label: 'Code', name: 'code', type: 'string' },
    { label: 'Display', name: 'display', type: 'string' },
]
const Period = [
    { label: 'Start', name: 'start', type: 'string' },
    { label: 'End', name: 'end', type: 'string' },
]
const Name = [
    { label: 'Use', name: 'use', type: 'string' },
    { label: 'Text', name: 'text', type: 'string' },
    { label: 'Family', name: 'family', type: 'string' },
    {
        label: 'Given',
        name: 'give',
        type: 'array_string',
    },
]
const Telecom = [
    { label: 'Use', name: 'use', type: 'string' },
    { label: 'System', name: 'system', type: 'string' },
    { label: 'Value', name: 'value', type: 'string' },
    {
        label: 'Period',
        name: 'period',
        type: 'object',
        display: 'start',
        children: Period,
    },
]

const CodeableConcept = [
    {
        label: 'Codeing',
        name: 'codeing',
        type: 'array',
        childrens: Coding,
    },
    { label: 'Text', name: 'text', type: 'string' },
]

export const PatientCols = [
    { label: 'ID', name: 'id', type: 'string' },
    {
        label: 'Text',
        name: 'text',
        type: 'object',
        childrens: [
            { label: 'Status', name: 'status', type: 'string' },
            { label: 'Div', name: 'div', type: 'string' },
        ],
    },
    {
        label: 'Identifier',
        name: 'identifier',
        type: 'array',
        childrens: [
            { label: 'Use', name: 'use', type: 'string' },
            { label: 'System', name: 'system', type: 'string' },
            { label: 'Value', name: 'value', type: 'string' },
            {
                label: 'Type',
                name: 'type',
                type: 'object',
                childrens: CodeableConcept,
            },
        ],
    },
    {
        label: 'Active',
        name: 'active',
        type: 'boolean',
    },
    {
        label: 'Name',
        name: 'name',
        type: 'array',
        childrens: Name,
    },
    {
        label: 'Telecom',
        name: 'telecom',
        type: 'array',
        childrens: Telecom,
    },
    { label: 'Gender', name: 'gender', type: 'string' },
    { label: 'BirthDate', name: 'birthDate', type: 'string' },
    {
        label: 'Address',
        name: 'address',
        type: 'array',
        childrens: [
            { label: 'Room', name: 'room', type: 'string' },
            { label: 'Floor', name: 'floor', type: 'string' },
            { label: 'Number', name: 'number', type: 'string' },
            { label: 'Alley', name: 'alley', type: 'string' },
            { label: 'Lane', name: 'lane', type: 'string' },
            { label: 'Section', name: 'section', type: 'string' },
            { label: 'Neighborhood', name: 'neighborhood', type: 'string' },
            { label: 'Use', name: 'use', type: 'string' },
            { label: 'Type', name: 'type', type: 'string' },
            { label: 'Text', name: 'text', type: 'string' },
            { label: 'Line', name: 'line', type: 'string' },
            { label: 'City', name: 'city', type: 'string' },
            { label: 'District', name: 'district', type: 'string' },
            { label: 'PostalCode', name: 'postalCode', type: 'string' },
            { label: 'Country', name: 'country', type: 'string' },
            {
                label: 'PostalCode',
                name: '_postalCode',
                type: 'object',

                childrens: [
                    {
                        label: 'Extension',
                        name: 'extension',
                        type: 'array',
                        childrens: [
                            { label: 'URL', name: 'url', type: 'string' },
                            {
                                label: 'ValueCodeableConcept',
                                name: 'valueCodeableConcept',
                                type: 'object',
                                childrens: [{ label: 'Coding', name: 'coding', type: 'array', children: Coding }],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Extension',
                name: 'extension',
                type: 'array',
                childrens: [
                    { label: 'URL', name: 'url', type: 'string' },
                    {
                        label: 'ValueString',
                        name: 'valueString',
                        type: 'string',
                    },
                ],
            },
        ],
    },
    {
        label: 'MaritalStatus',
        name: 'maritalStatus',
        type: 'object',

        childrens: CodeableConcept,
    },
    {
        label: 'Photo',
        name: 'photo',
        type: 'array',
        childrens: [
            {
                label: 'ContentType',
                name: 'contentType',
                type: 'string',
            },
            {
                label: 'Data',
                name: 'data',
                type: 'string',
            },
            {
                label: 'URL',
                name: 'url',
                type: 'string',
            },
        ],
    },
    {
        label: 'Contact',
        name: 'contact',
        type: 'array',
        childrens: [
            {
                label: 'RelationShip',
                name: 'relationShip',
                type: 'array',
                childrens: CodeableConcept,
            },
            {
                label: 'Name',
                name: 'name',
                type: 'array',
                childrens: Name,
            },
            {
                label: 'Telecom',
                name: 'telecom',
                type: 'array',
                childrens: Telecom,
            },
            {
                label: 'Period',
                name: 'period',
                type: 'object',
                childrens: Period,
            },
        ],
    },
    {
        label: 'Communication',
        name: 'communication',
        type: 'array',
        childrens: [
            {
                label: 'Language',
                name: 'language',
                type: 'object',
                childrens: CodeableConcept,
            },
        ],
    },
    {
        label: 'ManagingOrganization',
        name: 'managingOrganization',
        type: 'object',
        childrens: [
            {
                label: 'Reference',
                name: 'reference',
                type: 'string',
            },
        ],
    },
]
