import {Input} from "@app/components";
import {Search} from "@app/assets";
// import {getSelectValue} from "@app/shared";
// import {useState} from "react";
// import {Destination, FilterIcon, Search} from "@app/assets";

const Index = () => {
    // const [appealStatus, setAppealStatus] = useState<string | undefined>(undefined);
    // const [destination, setDestination] = useState<string | undefined>(undefined);

    return (
        <div className="flex items-center justify-between gap--3xl">
            <Input
                id='search'
                placeholder='Search...'
                icon={<Search/>}
            />
            <div className="flex items-center gap--lg">
                {/*<Select*/}
                {/*    options={[]}*/}
                {/*    type="filter"*/}
                {/*    id='appeal-status'*/}
                {/*    placeholder="Appeal status"*/}
                {/*    icon={<FilterIcon/>}*/}
                {/*    value={getSelectValue([], appealStatus)}*/}
                {/*    defaultValue={getSelectValue([], appealStatus)}*/}
                {/*    handleOnChange={e => setAppealStatus(e as string)}*/}
                {/*/>*/}
                {/*<Select*/}
                {/*    options={[]}*/}
                {/*    type="filter"*/}
                {/*    id='destination'*/}
                {/*    placeholder="Destination"*/}
                {/*    value={getSelectValue([], destination)}*/}
                {/*    icon={<Destination/>}*/}
                {/*    defaultValue={getSelectValue([], destination)}*/}
                {/*    handleOnChange={e => setDestination(e as string)}*/}
                {/*/>*/}
            </div>
        </div>
    );
};

export default Index;