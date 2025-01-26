import {ISelectOption} from "@app/interfaces";
import {Uz} from "@app/assets";
import {STATUS_LABEL, STATUS_LIST} from "@app/shared";

const languageOptions: ISelectOption[] = [
    {value: 'uzb', label: 'uzb', icon: <Uz/>},
    {value: 'uz', label: 'uz', icon: <Uz/>},
]

const paginationOptions: ISelectOption[] = [
    {value: 5, label: "5"},
    {value: 10, label: "10"},
    {value: 20, label: "20"},
    {value: 50, label: "50"},
    {value: 100, label: "100"},
]

const appealStatusOptions: ISelectOption[] = [
    {
        value: 'positive',
        label: "Positive"
    },
    {
        value: 'negative',
        label: "Negative"
    }
]

const statusTabOptions: ISelectOption[] = [
    {
        value: STATUS_LIST.ALL,
        label: STATUS_LABEL[STATUS_LIST.ALL]
    },
    {
        value: STATUS_LIST.NEW,
        label: STATUS_LABEL[STATUS_LIST.NEW]
    },
    {
        value: STATUS_LIST.IN_PROGRESS,
        label: STATUS_LABEL[STATUS_LIST.IN_PROGRESS]
    },
    {
        value: STATUS_LIST.RETURNED,
        label: STATUS_LABEL[STATUS_LIST.RETURNED]
    },
    {
        value: STATUS_LIST.APPROVED,
        label: STATUS_LABEL[STATUS_LIST.APPROVED]
    },
    {
        value: STATUS_LIST.REJECTED,
        label: STATUS_LABEL[STATUS_LIST.REJECTED]
    }
]

const applicationTabOption: ISelectOption[] = [
    {
        value: STATUS_LIST.ALL,
        label: STATUS_LABEL[STATUS_LIST.ALL]
    },
    {
        value: STATUS_LIST.NEW,
        label: STATUS_LABEL[STATUS_LIST.NEW]
    },
    {
        value: STATUS_LIST.RESPONSE_IN_PROGRESS,
        label: STATUS_LABEL[STATUS_LIST.RESPONSE_IN_PROGRESS]
    },
    {
        value: STATUS_LIST.RETURNED,
        label: STATUS_LABEL[STATUS_LIST.RETURNED]
    },
    {
        value: STATUS_LIST.SENT_TO_MOF,
        label: STATUS_LABEL[STATUS_LIST.SENT_TO_MOF]
    },
    {
        value: STATUS_LIST.APPROVED,
        label: STATUS_LABEL[STATUS_LIST.APPROVED]
    },
    {
        value: STATUS_LIST.REJECTED,
        label: STATUS_LABEL[STATUS_LIST.REJECTED]
    }
]

const investmentTabOption: ISelectOption[] = [
    {
        value: STATUS_LIST.NEW,
        label: STATUS_LABEL[STATUS_LIST.NEW]
    },
    {
        value: STATUS_LIST.MONITORING,
        label: STATUS_LABEL[STATUS_LIST.MONITORING]
    }
]

const regionsOptions: ISelectOption[] = [
    {
        label: 'Fergana region',
        value: 13
    },
    {
        label: 'Tashkent region',
        value: 1
    },
    {
        label: 'Namangan region',
        value: 4
    },
    {
        label: 'Andijan region',
        value: 5
    },
    {
        label: 'Sirdarya region',
        value: 11
    },
    {
        label: 'Jizzakh region',
        value: 2
    },
    {
        label: 'Samarkand region',
        value: 6
    },
    {
        label: 'Kashkadarya region',
        value: 8
    },
    {
        label: 'Surkhandarya region',
        value: 9
    },
    {
        label: 'Republic of Karakalpakstan',
        value: 12
    },
    {
        label: 'Navoi region',
        value: 7
    },
    {
        label: 'Khorezm region',
        value: 10
    },
    {
        label: 'Bukhara region',
        value: 3
    },
    {
        label: 'Tashkent city',
        value: 14
    }
]


export {
    languageOptions,
    paginationOptions,
    appealStatusOptions,
    statusTabOptions,
    applicationTabOption,
    investmentTabOption,
    regionsOptions
}