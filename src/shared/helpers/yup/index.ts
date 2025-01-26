import * as Yup from "yup";
import * as yup from "yup";

const loginSchema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .required("This field is required")
        .min(5, "Username must be at least 5 characters long")
        .max(20, "Username must not exceed 20 characters"),
    password: Yup.string()
        .trim()
        .required("This field is required")
        .min(8, "Password must be at least 8 characters long")
        .max(30, "Password must not exceed 30 characters"),
});

const appealSchema = Yup.object().shape({
        lastName: Yup.string().trim().required("This field is required"),
        firstName: Yup.string().trim().required("This field is required"),
        middleName: Yup.string().trim().required("This field is required"),
        idNumber: Yup.string().trim().required("This field is required").length(14, "The entered data is not valid"),
        region: Yup.string().required("This field is required"),
        wmfRegion: Yup.string().required("This field is required"),
        address: Yup.string().trim().required("This field is required"),
        organization: Yup.string().trim().required("This field is required"),
        tin: Yup.string().trim().required("This field is required").length(9, "The entered data is not valid"),
        bankAccount: Yup.string().trim().required("This field is required"),
        balanceHolder: Yup.string().trim().required("This field is required"),
        phone: Yup.string().trim().required("This field is required").length(17, "The entered data is not valid"),
        email:
            Yup.string()
                .trim()
                .matches(
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    "Invalid email address format"
                )
                .required("This field is required"),
        wmfType:
            Yup.array().required("This field is required"),
        objects:
            Yup.array().required("This field is required"),
        content:
            Yup.string().trim().required("This field is required"),
        files:
            Yup.array().required("This field is required"),
    })
;

const operatorReplySchema = yup.object().shape({
    responseType: yup.string().required("This field is required"),
    // responseDate: yup.string().required("This field is required"),
    responseText: yup.string().required("This field is required"),
    files: yup.array().required("This field is required"),
});

const operatorReturnSchema = yup.object().shape({
    responseText: yup.string().required("This field is required"),
    files: yup.array().nullable(),
});

const sentSchema = yup.object().shape({
    files: yup.array().required("This field is required"),
});

const returnSchema = yup.object().shape({
    comment: yup.string().required("This field is required"),
});


// Applications

const applicationSchema = Yup.object().shape({
    name: Yup.string().trim().required("This field is required"),
    cost: Yup.string().trim().required("This field is required"),
    startDate: Yup.string().required("This field is required"),
    endDate: Yup.string().required("This field is required"),
    files: Yup.array().required("This field is required"),
    content: Yup.string().trim().required("This field is required"),
})

// Investments
const investmentsPlanSchema = Yup.object().shape({
    foracast_electricity_cost: Yup.string().trim().required("This field is required"),
    exploitation_cost: Yup.string().trim().required("This field is required"),
    exploitation_salary: Yup.string().trim().required("This field is required"),
    exploitation_electricity_cost: Yup.string().trim().required("This field is required"),
    exploitation_full_repair: Yup.string().trim().required("This field is required"),
    exploitation_current_repair: Yup.string().trim().required("This field is required"),
    exploitation_other_cost: Yup.string().trim().required("This field is required"),
    investment_funds: Yup.string().trim().required("This field is required"),
    year: Yup.string().required("This field is required"),
});

const addReportSchema = Yup.object().shape({
    cost: Yup.string().trim().required("This field is required"),
    description: Yup.string().trim().required("This field is required"),
    files: yup.array().required("This field is required"),

});

// Electricity
const electricityPlanSchema = Yup.object().shape({
    electricity_capacity: Yup.string().trim().required("This field is required"),
    year: Yup.string().required("This field is required"),
});

const electricityReportSchema = Yup.object().shape({
    electricity_capacity: Yup.string().trim().required("This field is required"),
    description: Yup.string().trim().required("This field is required"),
    files: yup.array().required("This field is required"),
});

export {
    loginSchema,
    appealSchema,
    operatorReplySchema,
    returnSchema,
    operatorReturnSchema,
    applicationSchema,
    sentSchema,
    investmentsPlanSchema,
    addReportSchema,
    electricityPlanSchema,
    electricityReportSchema
}