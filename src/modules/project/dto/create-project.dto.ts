import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(6)
  name: string;

  @IsString()
  @MaxLength(100)
  @MinLength(10)
  description: string;

  @IsString()
  @MaxLength(100)
  @IsUrl(undefined, {
    message: 'Repository URL must be a valid URL',
  })
  repository: string;
}
