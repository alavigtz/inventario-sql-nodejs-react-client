import React, { useEffect, useState } from 'react'
import {getBranchesApi} from '../../../api/branch';
import BranchesList from '../../../components/Admin/Branches/BranchesList/BranchesList';

export default function Branches() {
    const [branches, setBranches] = useState([]);
    const [reloadBranches, setReloadBranches] = useState(false);

    useEffect(() => {
        getBranchesApi().then(response => {
            setBranches(response.branches[0]);
        });
        setReloadBranches(false);
    }, [reloadBranches]);

    return (
        <BranchesList branches={branches} setReloadBranches={setReloadBranches} />
    )
}
