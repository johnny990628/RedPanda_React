export const Coding = [
    { label: 'System', name: 'system', type: 'string' },
    { label: 'Code', name: 'code', type: 'string' },
    { label: 'Display', name: 'display', type: 'string' },
]
export const Period = [
    { label: 'Start', name: 'start', type: 'string' },
    { label: 'End', name: 'end', type: 'string' },
]
export const Name = [
    { label: 'Use', name: 'use', type: 'string' },
    { label: 'Text', name: 'text', type: 'string' },
    { label: 'Family', name: 'family', type: 'string' },
    {
        label: 'Given',
        name: 'give',
        type: 'array_string',
    },
]
export const Telecom = [
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

export const CodeableConcept = [
    {
        label: 'Codeing',
        name: 'codeing',
        type: 'array',
        childrens: Coding,
    },
    { label: 'Text', name: 'text', type: 'string' },
]
