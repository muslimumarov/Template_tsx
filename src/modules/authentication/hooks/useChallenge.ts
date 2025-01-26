import {useMutation} from "@tanstack/react-query";
import {SignatureService} from "@app/services";

export default function Index() {
    const {isPending, mutateAsync: handleChallenge} = useMutation({mutationFn: () => SignatureService.getChallenge()})

    return {isPending, handleChallenge}
}
