import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {appealSchema, BUTTON_THEME, extractValues, FIELD, getLabelsFromIds, getSelectValue} from '@app/shared'
import {useAddAppeal, useAppealDetail, useAppealFileGenerate, useEditAppeal} from '@modules/appeals/hooks'
import {useSelect} from '@app/hooks'
import {
    Button,
    FileUpLoader,
    FormGrid,
    Input,
    Modal,
    NumberFormattedInput,
    PageLayout,
    PageTitle,
    Select
} from '@app/components'
import {FC, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './styles.module.scss'
import {MaskInput} from '@components/UI'


interface IProperties {
    edit?: boolean;
}

const AddAppeal: FC<IProperties> = ({edit = false}) => {
    const navigate = useNavigate()
    const [modal, setModal] = useState<string | undefined>(undefined)
    const [file, setFile] = useState<number | undefined>(undefined)

    const {
        handleSubmit,
        control,
        register,
        reset,
        setValue,
        watch,
        formState: {errors}
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            lastName: '',
            firstName: '',
            middleName: '',

            idNumber: '',
            region: undefined,
            address: '',

            organization: '',
            tin: '',
            bankAccount: '',

            phone: '',
            email: '',
            wmfRegion: undefined,
            balanceHolder: undefined,

            wmfType: undefined,
            objects: undefined,
            files: undefined,

            content: ''
        },
        resolver: yupResolver(appealSchema)
    })
    const {data: regions} = useSelect('region')
    const {data: organizations} = useSelect('owner-organization', {region: watch('wmfRegion') ? watch('wmfRegion') : ''}, !!watch('wmfRegion'))
    const {data: types} = useSelect('object-type', {}, !!watch('balanceHolder'), watch('balanceHolder') ? watch('balanceHolder') : '')
    const {data: objects} = useSelect('object', (!!watch('wmfType') && watch('wmfType')?.length !== 0) ? {
        types: watch('wmfType') as unknown as string,
        organization: watch('balanceHolder')
    } : {}, !!watch('wmfType') && !!watch('balanceHolder'))
    const {isPending, addAppeal} = useAddAppeal(reset)
    const {isPending: isGeneratingFile, generateFile} = useAppealFileGenerate()
    const {isPending: isEditPending, editAppeal} = useEditAppeal(reset)

    const {data} = useAppealDetail(edit)

    useEffect(() => {
        if (data && edit) {
            reset({
                lastName: data.firstname,
                firstName: data.lastname,
                middleName: data.patronymic as string,

                idNumber: data.id_number,
                region: data.region?.value as string,
                address: data.address,

                organization: data.organization,
                tin: data.inn_number,
                bankAccount: data.bank_account,

                phone: data.phone,
                email: data.email,
                wmfRegion: data.sxo_region?.value as string,
                balanceHolder: data.owner_organization?.value as string,

                wmfType: extractValues(data.object_types),
                objects: extractValues(data.sxo_objects),
                files: data.files,

                content: data.description
            })
        }
    }, [data, edit, reset])


    function handleRegionChange() {
        setValue('balanceHolder', undefined as unknown as string)
        setValue('wmfType', undefined as unknown as string[])
        setValue('objects', undefined as unknown as string[])
    }

    function handleBalanceHolderChange() {
        setValue('wmfType', undefined as unknown as string[])
        setValue('objects', undefined as unknown as string[])
    }

    function handleWmfTypeChange() {
        setValue('objects', undefined as unknown as string[])
    }

    const handleCloseModal = () => {
        setModal(undefined)
        setFile(undefined)
    }

    return (
        <PageLayout>
            <PageTitle title={edit ? 'Edit' : 'Create appeal'}/>
            <FormGrid
                onSubmit={
                    handleSubmit((data) => {
                        generateFile({
                            company_name: data?.organization,
                            fullName: `${data?.firstName?.[0]}. ${data?.lastName}`,
                            object_name: getLabelsFromIds(data.objects, objects),
                            owner_organization: getLabelsFromIds(data.balanceHolder, organizations),
                            object_type: getLabelsFromIds(data.wmfType, types),
                            object_region: getLabelsFromIds(data.wmfRegion, regions)
                        }).then(data => {
                            setModal(data?.file_path)
                            setFile(data?.attachment)
                        })
                    })
                }
            >
                <Input
                    id="lastName"
                    type={FIELD.TEXT}
                    label="Applicant's last name"
                    placeholder="Enter applicant's last name"
                    error={errors?.lastName?.message}
                    {...register('lastName')}
                />
                <Input
                    id="firstName"
                    type={FIELD.TEXT}
                    label="Applicant's first name"
                    placeholder="Enter applicant's first name"
                    error={errors?.firstName?.message}
                    {...register('firstName')}
                />
                <Input
                    id="middleName"
                    type={FIELD.TEXT}
                    label="Applicant's middle name"
                    placeholder="Enter applicant's middle name"
                    error={errors?.middleName?.message}
                    {...register('middleName')}
                />

                {/*<Input*/}
                {/*    id="idNumber"*/}
                {/*    type={FIELD.TEXT}*/}
                {/*    label="Applicant ID or Tax ID number"*/}
                {/*    placeholder="Enter applicant ID or Tax ID number"*/}
                {/*    error={errors?.idNumber?.message}*/}
                {/*    {...register("idNumber")}*/}
                {/*/>*/}

                <Controller
                    control={control}
                    name="idNumber"
                    render={({field}) => (
                        <NumberFormattedInput
                            id="idNumber"
                            maxLength={14}
                            disableGroupSeparators={true}
                            allowDecimals={false}
                            label="Applicant ID or Tax ID number"
                            placeholder="Enter applicant ID or Tax ID number"
                            error={errors?.idNumber?.message}
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="region"
                    control={control}
                    render={({field: {value, ref, onChange, onBlur}}) => (
                        <Select
                            ref={ref}
                            id="region"
                            options={regions}
                            onBlur={onBlur}
                            label="Region"
                            error={errors?.region?.message}
                            value={getSelectValue(regions, value)}
                            placeholder="Select region"
                            defaultValue={getSelectValue(regions, value)}
                            handleOnChange={(e) => onChange(e as string)}
                        />
                    )}
                />
                <Input
                    id="address"
                    type={FIELD.TEXT}
                    label="Address"
                    placeholder="Enter address"
                    error={errors?.address?.message}
                    {...register('address')}
                />
                <Input
                    id="organization"
                    type={FIELD.TEXT}
                    label="Organization name"
                    placeholder="Enter organization name"
                    error={errors?.organization?.message}
                    {...register('organization')}
                />

                {/*<Input*/}
                {/*    id="tin"*/}
                {/*    type={FIELD.TEXT}*/}
                {/*    label="Taxpayer Identification Number (TIN)"*/}
                {/*    placeholder="Enter TIN"*/}
                {/*    error={errors?.tin?.message}*/}
                {/*    {...register("tin")}*/}
                {/*/>*/}

                <Controller
                    control={control}
                    name="tin"
                    render={({field}) => (
                        <NumberFormattedInput
                            id="tin"
                            maxLength={9}
                            disableGroupSeparators={true}
                            allowDecimals={false}
                            label="Taxpayer Identification Number (TIN)"
                            placeholder="Enter TIN"
                            error={errors?.tin?.message}
                            {...field}
                        />
                    )}
                />

                {/*<Input*/}
                {/*    id="bankAccount"*/}
                {/*    type={FIELD.TEXT}*/}
                {/*    label="Bank account number"*/}
                {/*    placeholder="Enter bank account number"*/}
                {/*    error={errors?.bankAccount?.message}*/}
                {/*    {...register("bankAccount")}*/}
                {/*/>*/}

                <Controller
                    control={control}
                    name="bankAccount"
                    render={({field}) => (
                        <NumberFormattedInput
                            id="bankAccount"
                            maxLength={20}
                            disableGroupSeparators={true}
                            allowDecimals={false}
                            label="Bank account number"
                            placeholder="Enter bank account number"
                            error={errors?.bankAccount?.message}
                            {...field}
                        />
                    )}
                />

                {/*<Input*/}
                {/*    id="phone"*/}
                {/*    type={FIELD.TEXT}*/}
                {/*    label="Phone number"*/}
                {/*    placeholder="Enter phone number"*/}
                {/*    error={errors?.phone?.message}*/}
                {/*    {...register("phone")}*/}
                {/*/>*/}

                <Controller
                    name="phone"
                    control={control}
                    render={({field}) => (
                        <MaskInput
                            id="phone"
                            label="Phone number"
                            placeholder="Enter phone number"
                            error={errors?.phone?.message}
                            {...field}
                        />
                    )}
                />

                <Input
                    id="email"
                    type={FIELD.TEXT}
                    label="Email address"
                    placeholder="Enter email address"
                    error={errors?.email?.message}
                    {...register('email')}
                />
                <Controller
                    name="wmfRegion"
                    control={control}
                    render={({field: {value, ref, onChange, onBlur}}) => (
                        <Select
                            ref={ref}
                            id="wmfRegion"
                            options={regions}
                            onBlur={onBlur}
                            label="WMF area"
                            error={errors?.wmfRegion?.message}
                            value={getSelectValue(regions, value)}
                            placeholder="Select the WMF area"
                            defaultValue={getSelectValue(regions, value)}
                            handleOnChange={(e) => {
                                onChange(e as string)
                                handleRegionChange()
                            }}
                        />
                    )}
                />
                <Controller
                    name="balanceHolder"
                    control={control}
                    render={({field: {value, ref, onChange, onBlur}}) => (
                        <Select
                            ref={ref}
                            id="balanceHolder"
                            options={organizations}
                            onBlur={onBlur}
                            label="Balance holding organization"
                            placeholder="Select balance holding organization"
                            error={errors?.balanceHolder?.message}
                            value={getSelectValue(organizations, value)}
                            defaultValue={getSelectValue(organizations, value)}
                            handleOnChange={(e) => {
                                onChange(e as string)
                                handleBalanceHolderChange()
                            }}
                        />
                    )}
                />
                <Controller
                    name="wmfType"
                    control={control}
                    render={({field: {value, ref, onChange, onBlur}}) => (
                        <Select
                            ref={ref}
                            id="wmfType"
                            options={types}
                            isMulti={true}
                            onBlur={onBlur}
                            label="WMF type"
                            error={errors?.wmfType?.message}
                            value={getSelectValue(types, value)}
                            placeholder="Select WMF type"
                            defaultValue={getSelectValue(types, value)}
                            handleOnChange={(e) => {
                                onChange(e as string)
                                handleWmfTypeChange()
                            }}
                        />
                    )}
                />
                <Controller
                    name="objects"
                    control={control}
                    render={({field: {value, ref, onChange, onBlur}}) => (
                        <Select
                            ref={ref}
                            id="objects"
                            options={objects}
                            onBlur={onBlur}
                            isMulti={true}
                            label="Objects"
                            error={errors?.objects?.message}
                            value={getSelectValue(objects, value)}
                            placeholder="Select object"
                            defaultValue={getSelectValue(objects, value)}
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
                            label="Additional documents"
                            error={errors?.files?.message}
                        />
                    )}
                />
                <div className="col-span--2">
                    <Input
                        id="content"
                        type={FIELD.TEXTAREA}
                        textarea={true}
                        label="Appeal content"
                        placeholder="Enter appeal content"
                        error={errors?.content?.message}
                        {...register('content')}
                    />
                </div>
                <div className="flex justify-between col-span--2 grid-row--8">
                    <Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE}>
                        Back
                    </Button>
                    <Button type={FIELD.SUBMIT} theme={BUTTON_THEME.PRIMARY} disabled={isGeneratingFile}>
                        Generate request
                    </Button>
                </div>
            </FormGrid>
            <Modal
                animation="flip"
                visible={!!modal && !!file}
                times={true}
                onClose={handleCloseModal}
                styles={{width: '50vw', height: '99vh'}}
            >
                <div className={styles.modal}>
                    <object
                        key={modal}
                        data={modal ?? ''}
                        type="application/pdf"
                    />
                </div>
                <div className="flex gap--lg items-center justify-center">
                    <Button
                        type={FIELD.BUTTON}
                        theme={BUTTON_THEME.PRIMARY_OUTLINE}
                        disabled={isPending || isEditPending}
                        onClick={handleCloseModal}
                    >
                        Edit
                    </Button>
                    <Button
                        type={FIELD.BUTTON}
                        onClick={
                            handleSubmit(
                                (data) =>
                                    edit ?
                                        editAppeal({...data, attachment: file}) :
                                        addAppeal({...data, attachment: file}))
                        }
                        theme={BUTTON_THEME.PRIMARY}
                        disabled={isPending || isEditPending}
                    >
                        Submit
                    </Button>
                </div>
            </Modal>
        </PageLayout>
    )
}

export default AddAppeal
