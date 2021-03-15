import Link from 'next/link'
import {
  AccountCircle,
  FavoriteBorder,
  ExitToApp
} from '@styled-icons/material-outlined'
import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown'
import DropDown from 'components/DropDown'
import * as S from './styles'
import { signOut } from 'next-auth/client'

export type UserDropDownProps = {
  username: string
}

const UserDropDown = ({ username }: UserDropDownProps) => (
  <DropDown
    title={
      <>
        <AccountCircle size={24} />
        <S.Username>{username}</S.Username>
        <ChevronDown size={24} />
      </>
    }
  >
    <S.Nav>
      <Link href="/profile/me" passHref>
        <S.Link>
          <AccountCircle />
          <span>My profile</span>
        </S.Link>
      </Link>

      <Link href="/wishlist" passHref>
        <S.Link>
          <FavoriteBorder />
          <span>Whishlist</span>
        </S.Link>
      </Link>

      <S.Link role="button" onClick={() => signOut()} title="Sign out">
        <ExitToApp />
        <span>Sign out</span>
      </S.Link>
    </S.Nav>
  </DropDown>
)

export default UserDropDown
