import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {applicationSchema, BUTTON_THEME, FIELD, generateYearsList, getSelectValue} from "@app/shared";
import {
    Button,
    FileUpLoader,
    FormGrid,
    Input,
    NumberFormattedInput,
    PageLayout,
    PageTitle,
    Select
} from "@app/components";
import {FC, useEffect} from "react";
import {useAddApplication, useApplicationDetail, useEditApplication} from "@modules/applications/hooks";
import {useNavigate} from "react-router-dom";

interface IProperties {
    edit?: boolean;
}

const Index: FC<IProperties> = ({edit = false}) => {
    const {
        handleSubmit,
        control,
        register,
        reset,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            name: "",
            cost: "",
            startDate: undefined,
            endDate: undefined,
            files: undefined,
            content: "",
        },
        resolver: yupResolver(applicationSchema),
    });

    const navigate = useNavigate()
    const {isPending, addApplication} = useAddApplication(reset)
    const {isPending: isEditPending, editApplication} = useEditApplication(reset)

    const {data} = useApplicationDetail(edit)

    useEffect(() => {
        if (data && edit) {
            reset({
                name: data.project_name,
                cost: data.cost,
                startDate: String(data.from_date),
                endDate: String(data.to_date),
                files: data.files,
                content: data.description,
            })
        }
    }, [data, edit, reset]);


    return (
        <PageLayout>
            <PageTitle title={edit ? "Edit" : "Submit application"}/>
            <FormGrid onSubmit={handleSubmit((data) => edit ? editApplication(data) : addApplication(data))}>
                <Input
                    id="name"
                    type={FIELD.TEXT}
                    label="Project name"
                    placeholder="Enter the project name"
                    error={errors?.name?.message}
                    {...register("name")}
                />

                <Controller
                    control={control}
                    name="cost"
                    render={({field}) => (
                        <NumberFormattedInput
                            id="cost"
                            label="Amount (in sum)"
                            placeholder="Enter the amount (in sum)"
                            {...field}
                            error={errors?.cost?.message}
                        />
                    )}
                />

                <Controller
                    name="startDate"
                    control={control}
                    render={({field: {value, ref, onChange, onBlur}}) => (
                        <Select
                            ref={ref}
                            id="startDate"
                            options={generateYearsList()}
                            onBlur={onBlur}
                            label="Duration (from)"
                            error={errors?.startDate?.message}
                            value={getSelectValue(generateYearsList(), value)}
                            placeholder="Select the duration"
                            defaultValue={getSelectValue(generateYearsList(), value)}
                            handleOnChange={(e) => onChange(e as string)}
                        />
                    )}
                />

                <Controller
                    name="endDate"
                    control={control}
                    render={({field: {value, ref, onChange, onBlur}}) => (
                        <Select
                            ref={ref}
                            id="endDate"
                            options={generateYearsList()}
                            onBlur={onBlur}
                            label="Duration (to)"
                            error={errors?.endDate?.message}
                            value={getSelectValue(generateYearsList(), value)}
                            placeholder="Select the duration"
                            defaultValue={getSelectValue(generateYearsList(), value)}
                            handleOnChange={(e) => onChange(e as string)}
                        />
                    )}
                />

                <Controller
                    name="files"
                    control={control}
                    render={({field: {value, ref, onChange, onBlur}}) => (
                        <FileUpLoader
                            id="files"
                            ref={ref}
                            multi={true}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            label="Documents"
                            error={errors?.files?.message}
                        />
                    )}
                />

                <div className='col-span--2'>
                    <Input
                        id="content"
                        type={FIELD.TEXTAREA}
                        textarea={true}
                        label="Application content"
                        placeholder="Enter the application content"
                        error={errors?.content?.message}
                        {...register("content")}
                    />
                </div>

                <div className='flex justify-between col-span--2 grid-row--4'>
                    <Button onClick={() => navigate(`/applications`)} theme={BUTTON_THEME.OUTLINE}>
                        Back
                    </Button>
                    <Button type={FIELD.SUBMIT} theme={BUTTON_THEME.PRIMARY} disabled={isPending || isEditPending}>
                        {
                            edit ? "Edit" : "Submit"
                        }
                    </Button>
                </div>
            </FormGrid>
        </PageLayout>
    );
};

export default Index;
